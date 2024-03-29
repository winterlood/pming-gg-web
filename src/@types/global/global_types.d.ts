declare module "*.png";

declare module "@types" {
  export namespace api_types {
    interface OutJobPost {
      id: string;
      position: string;
      company: {
        name: string;
      };
      logo_img: {
        origin: string;
        thumb: string;
      };
      title_img: {
        origin: string;
        thumb: string;
      };
    }

    interface Alarm {
      id: string;
      is_checked: boolean;
      createdAt: string;
      send_user: UserProfile;
      job_post: JobPost;
    }

    interface Magazine {
      id: string;
      url: string;
      title: string;
      createdAt: string;
      cover: string;
    }

    interface Apply {
      id: string;
      is_matched: boolean;
      job_post: JobPost;
      apply_user: UserProfile;
      updatedAt: string;
    }

    interface JobOffer {
      id: string;
      job_post: JobPost;
      offer_message: string;
      offer_received_user: UserProfile;
      offer_send_user: UserProfile;
      updatedAt: string;
    }

    interface JobPost {
      id: string;
      thumbnail_url: string;
      duty: string;
      salary: string;
      work_type: string;
      location: string;
      requirements: string[];
      author: UserProfile & common_types.BusinessUserInfo;
    }

    interface ImageUpload {
      filename: string;
      path: strign;
    }

    interface UserProfile {
      id: string;
      email: string;
      username: string;
      name: string;
      avatar_url: string;
      is_profile_created: boolean;
      user_detail_individual: {
        annual: number;
        bio: string;
        birth: string;
        createdAt: string;
        id: string;
        location: string;
        name: string;
        detail_profile_id: string;
      } | null;
      user_detail_business: {
        establishment_date: string;
        capital: number;
        employees: number;
        detail_profile_id: string;
      } | null;
      github_user: GitHubHistory;
    }

    interface GithubLoginResult {
      access_token: string;
      scope: string;
      token_type: string;
    }

    interface GitHubRepo {
      id: string;
      name: string;
      owner: { login: string; avatarUrl: string };
      openGraphImageUrl: string;
      isPrivate: boolean;
      isInOrganization: boolean;
      totalCommitCount: number;
      totalIssueCount: number;
      forkCount: number;
      starCount: number;
      userCommitCount: number;
      userIssueCount: number;
      userPRCount: number;
      topicList: string[];
      languageList: { name: string; size: number; color: string }[];
    }

    interface GitHubProfile {
      avatar_url: string;
      bio: string;
      followers: number;
      following: number;
      login: string;
      name: string;
      location: string;
    }

    interface GitHubHistory {
      totalRepoCount: number;
      totalCommitCount: number;
      totalIssueCount: number;
      totalPRCount: number;
      totalReviewCount: number;
      totalCommitRepoCount: number;
      totalIssueRepoCount: number;
      totalPRRepoCount: number;
      totalReviewRepoCount: number;

      firstLangName: string;
      secondLangName: string;
      thirdLangName: string;

      totalLangList: {
        name: string;
        size: number;
        color: string;
        count: number;
      }[];
      topicList: { name: string; count: number }[];
      repoList: GithubRepo[];
    }
  }
  export namespace common_types {
    type UserType = "individual" | "business";

    interface UserInfoBase {
      id: string;
      email: string;
    }

    interface BusinessUserInfo extends UserInfoBase {
      type: "business";
      establishment_date: string;
      capital: number;
      employees: number;
    }

    interface IndividualUserInfo extends UserInfoBase {
      type: "individual";
      name: string;
      bio: stirng;
      birth: string;
      location: string;
      annual: number;
    }

    // auth api
    interface AuthUser {
      jwt: string;
      user: {
        blocked: boolean;
        confirmed: boolean;
        createdAt: string;
        email: string;
        id: string;
        provider: string;
        updatedAt: string;
        is_profile_created: boolean;
        user_type: "individual" | "business";
        username: string;
        name: string;
      };
    }
  }
  export namespace extra_types {
    interface UseQueryOptions {
      cacheTime?: number | Infinity;
      enabled?: boolean;
      networkMode?: "online" | "always" | "offlineFirst";
      initialData?: string;
      initialDataUpdatedAt?: string;
      isDataEqual?: string;
      keepPreviousData?: string;
      meta?: string;
      notifyOnChangeProps?: string;
      onError?: string;
      onSettled?: string;
      onSuccess?: string;
      placeholderData?: string;
      queryKeyHashFn?: string;
      refetchInterval?: string;
      refetchIntervalInBackground?: string;
      refetchOnMount?: string;
      refetchOnReconnect?: string;
      refetchOnWindowFocus?: string;
      retry?: string;
      retryOnMount?: string;
      retryDelay?: string;
      select?: string;
      staleTime?: string;
      structuralSharing?: string;
      suspense?: string;
      useErrorBoundary?: string;
    }
  }
}
