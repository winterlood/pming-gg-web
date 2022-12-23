const queryKey = {
  getProfile: (id: string) => ["profile", id],
  getJobPostByUserId: (id: string) => ["jobPostByUserId", id],
  getJobPostById: (id: string) => ["jobPostById", id],
  getApply: (id: string) => ["applyByUser", id],
  getRecommendedJobPost: (search?: string) => ["recommendedJobPost", search],
  getRecommendDevelopers: ["getRecommendDevelopers"],
  getOffer: (offer_send_user_id?: string, offer_received_user_id?: string) => [
    "jobOffer",
    offer_send_user_id,
    offer_received_user_id,
  ],
};
export default queryKey;
