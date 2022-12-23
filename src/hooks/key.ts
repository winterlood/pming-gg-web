const queryKey = {
  getProfile: (id: string) => ["profile", id],
  getJobPostByUserId: (id: string) => ["jobPostByUserId", id],
  getJobPostById: (id: string) => ["jobPostById", id],
  getApply: (id: string) => ["applyByUser", id],
  getRecommendedJobPost: (search?: string) => ["recommendedJobPost", search],
  getRecommendDevelopers: ["getRecommendDevelopers"],
};
export default queryKey;
