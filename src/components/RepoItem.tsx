import style from "./RepoItem.module.scss";
import classNames from "classnames/bind";
import { api_types } from "@types";
const cx = classNames.bind(style);

interface Props {
  repo: api_types.GitHubRepo;
  className?: string;
  onClick?: any;
}

function RepoItem({ repo, className, onClick }: Props) {
  return (
    <div className={[cx("container"), className].join(" ")} onClick={onClick}>
      <div className={cx("repo-header")}>
        <div className={cx("repo-owner-avatar-box")}>
          <img src={repo.owner.avatarUrl} />
        </div>
        <div className={cx("repo-profile")}>
          <div className={cx("repo-name-info-list")}>
            <div className={cx("repo-name")}>{repo.name}</div>
            {repo.isPrivate && <div className={cx("private-tag")}>Private</div>}
          </div>

          <div className={cx("repo-name-with-owner")}>
            {repo.owner.login}/{repo.name}
          </div>
        </div>
      </div>

      <div className={cx("repo-langauge-list")}>
        {repo.languageList.slice(0, 3).map((lang) => (
          <div
            className={cx("repo-language-item")}
            key={`${repo.id}-${lang.name}`}
          >
            <div
              style={{
                backgroundColor: lang.color,
              }}
              className={cx("ellipse")}
            ></div>
            <div className={cx("name")}>{lang.name}</div>
          </div>
        ))}
      </div>

      <div className={cx("repo-contribute-list")}>
        <div className={cx("")}></div>
        <div className={cx("")}></div>
        <div className={cx("")}></div>
        <div className={cx("")}></div>
      </div>
    </div>
  );
}
export default RepoItem;
