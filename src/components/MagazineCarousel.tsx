import style from "./MagazineCarousel.module.scss";
import classNames from "classnames/bind";
import Carousel from "./Carousel";
import useGetMagazineListQuery from "@hooks/useGetMagazineListQuery";
import MagazineItem from "./MagazineItem";

const cx = classNames.bind(style);

function MagazineCraousel() {
  const { data, isLoading } = useGetMagazineListQuery();
  return (
    <div className={cx("container")}>
      <Carousel className={cx("carousel")}>
        {data ? (
          data.map((it) => <MagazineItem key={it.id} {...it} />)
        ) : (
          <div></div>
        )}
      </Carousel>
    </div>
  );
}

export default MagazineCraousel;
