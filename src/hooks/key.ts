const queryKey = {
  getProfile: (id: string) => ["profile", id],
  getJobPostByUserId: (id: string) => ["jobPostByUserId", id],
  getJobPostById: (id: string) => ["jobPostById", id],
  getApply: (
    apply_user_id?: string,
    author_user_id?: string,
    job_post_id?: string
  ) => ["applyByUser", apply_user_id, author_user_id, job_post_id],
  getRecommendedJobPost: (search?: string) => ["recommendedJobPost", search],
  getRecommendDevelopers: ["getRecommendDevelopers"],
  getOffer: (
    offer_send_user_id?: string,
    offer_received_user_id?: string,
    job_post_id?: string
  ) => ["jobOffer", offer_send_user_id, offer_received_user_id, job_post_id],
  getMagazineList: ["magazineList"],
  getNotionPage: (id: string) => ["notionPage", id],
  getNotionPageInfo: (id: string) => ["notionPageInfo", id],
};
export default queryKey;
