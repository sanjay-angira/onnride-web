'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  findNearestServiceLocation,
  getBrowserCoordinates,
} from '@/lib/nearest-location';
import type { Location } from '@/types';

interface UseDetectNearestLocationOptions {
  locations: Location[];
  enabled: boolean;
  onMatch: (location: Location) => void;
}

export function useDetectNearestLocation({
  locations,
  enabled,
  onMatch,
}: UseDetectNearestLocationOptions) {
  const [isDetecting, setIsDetecting] = useState(false);
  const [matchedLocation, setMatchedLocation] = useState<Location | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const autoAttemptedRef = useRef(false);
  const onMatchRef = useRef(onMatch);

  useEffect(() => {
    onMatchRef.current = onMatch;
  }, [onMatch]);

  const detectLocation = useCallback(
    async (mode: 'auto' | 'manual' = 'manual') => {
      if (!locations.length) return;

      setIsDetecting(true);
      if (mode === 'manual') {
        setStatusMessage(null);
      }

      try {
        const coords = await getBrowserCoordinates();
        const match = findNearestServiceLocation(
          locations,
          coords.latitude,
          coords.longitude,
        );

        if (match) {
          setMatchedLocation(match.location);
          setStatusMessage(`Using ${match.location.name} based on your location`);
          onMatchRef.current(match.location);
          return;
        }

        setStatusMessage('No OnnRide city found near you yet.');
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Could not detect your location.';
        if (mode === 'manual' || message.includes('permission')) {
          setStatusMessage(message);
        }
      } finally {
        setIsDetecting(false);
      }
    },
    [locations],
  );

  useEffect(() => {
    if (!enabled || autoAttemptedRef.current || !locations.length) return;
    autoAttemptedRef.current = true;
    void detectLocation('auto');
  }, [detectLocation, enabled, locations.length]);

  return {
    detectLocation,
    isDetecting,
    matchedLocation,
    statusMessage,
  };
}
