import { blocks, faqs, h2, list, makePost, p, type BlogPost } from '../helpers';

export const post: BlogPost = makePost({
  slug: 'kyc-checklist-first-time-renters',
  title: 'KYC checklist for first-time OnnRide renters',
  excerpt:
    'You can book and pay before KYC is approved — but pickup is blocked until documents pass admin review. Here is what to upload.',
  category: 'Rental guide',
  cluster: 'policy',
  priority: 'B',
  publishedAt: '2025-04-15',
  dateModified: '2026-06-01',
  readTimeMinutes: 4,
  gradient: 'from-emerald-500 to-teal-700',
  tags: ['KYC', 'Documents', 'Pickup'],
  quickAnswer:
    'OnnRide lets you book and pay before KYC approval, but vendor handover is blocked until admin approves your documents. Upload clear Aadhaar, a valid full driving license, and a well-lit selfie — complete this early so pickup day stays smooth.',
  keyTakeaways: [
    'Book and pay first; KYC approval is required before ride start and handover.',
    'Prepare Aadhaar (front and back), full DL (not learner), and a clear selfie.',
    'Rejected uploads include a reason — fix and re-upload without losing your booking.',
    'Carry original license and ID used in KYC to pickup for vendor verification.',
  ],
  faqs: faqs([
    {
      q: 'Can I book on OnnRide without completing KYC?',
      a: 'Yes — browse, book, and pay without approved KYC. Pickup and ride start are blocked until admin approves your documents.',
    },
    {
      q: 'Which documents are required for OnnRide KYC?',
      a: 'Aadhaar (front and back), a valid full driving license (front and back), and a selfie with your face clearly visible for manual review.',
    },
    {
      q: 'Is a learner\'s license accepted?',
      a: 'No — only full driving licenses are accepted. Learner licenses cannot be used for self-drive handover.',
    },
    {
      q: 'How long does KYC approval take?',
      a: 'Timing varies with review queue — upload clear photos early, ideally days before pickup. Check status in your profile and respond quickly to rejection reasons.',
    },
    {
      q: 'What if my KYC is rejected?',
      a: 'Admin provides a rejection reason. Correct the issue (blur, mismatch, expired license) and re-upload. Your booking remains valid once KYC passes.',
    },
    {
      q: 'Do I need to bring originals to pickup?',
      a: 'Yes — carry your original driving license and the ID document used for KYC. The vendor verifies identity before handover.',
    },
    {
      q: 'Can someone else pick up the bike on my behalf?',
      a: 'Handover is tied to the verified renter on the booking. Another person cannot pick up unless platform and vendor policy explicitly allows it — confirm via booking chat.',
    },
    {
      q: 'Does KYC expire between bookings?',
      a: 'Once approved, KYC typically covers future bookings on your account unless documents expire or admin requests re-verification. Keep license validity current.',
    },
  ]),
  content: blocks(
    p(
      'OnnRide lets you browse, book and pay without approved KYC. That keeps checkout fast. Before vendor handover, your KYC must be approved — otherwise the ride cannot move to in-progress.',
    ),
    p(
      'Upload from a well-lit room with no glare on ID cards — blurry edges are the most common rejection reason for first-time renters.',
    ),
    h2('Documents to prepare'),
    list([
      'Aadhaar — clear front and back photos.',
      'Valid driving license — front and back; learner licenses are not accepted.',
      'Selfie — well-lit, face clearly visible for manual admin review.',
    ]),
    h2('After you upload'),
    p(
      'Status moves to pending review. Admin approves or rejects with a reason — you can re-upload after rejection. Complete KYC early so pickup day stays smooth; use booking chat to confirm timing with your vendor.',
    ),
  ),
});
