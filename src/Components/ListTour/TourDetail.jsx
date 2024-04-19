import { useState, useEffect } from "react";
import axios from "axios"; // Đảm bảo bạn đã cài đặt axios
import { BASE_URL } from "../../utils/config";
import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

import HTMLRenderer from "../HTML.component/HTML";

import { formatRegion } from "../../utils/formatRegion";
import { formatDateVNWithTime, formatDateVN } from "../../utils/formatDate";
const TourDetail = () => {
  // const { token } = useSelector((state) => state.user.currentUser);

  const { tourId } = useParams();
  const [tour, setTour] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  //const navigate = useNavigate();

  const fetchTour = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${BASE_URL}/tour/getTourById/${tourId}`,
      );
      setTour(response.data.tour);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTour();
  }, [tourId]);

  const formatPrice = (price) => {
    return <span style={{ color: "red" }}>{price?.toLocaleString()} đ</span>;
  };

  const formatPriceWithPromotion = (price, originalPrice, hasPromotion) => {
    if (hasPromotion && price !== originalPrice) {
      return (
        <>
          <span className="text-red-600">{formatPrice(price)}</span>
          <span className="ml-2 text-base text-gray-500 line-through">
            {formatPrice(originalPrice)}
          </span>
        </>
      );
    }
    return formatPrice(price);
  };

  if (isLoading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!tour) {
    return <div>Không phải tour bạn chọn</div>;
  }

  const displayImages = Array.isArray(tour.image) ? tour.image.slice(0, 6) : [];
  const displayVideos = Array.isArray(tour.video) ? tour.video.slice(0, 2) : [];

  const sliderSettings = {
    dots: false,
    // infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    infinite: displayImages.length > 1,
    autoplay: displayImages.length > 1,
    autoplaySpeed: 1500,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  const sliderSettingsVideo = {
    dots: false,
    // infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    infinite: displayVideos.length > 1,
    autoplay: displayVideos.length > 1,
    autoplaySpeed: 1500,
    arrows: false,
  };

  return (
    <div className="  8  h-[700px] py-2">
      <PerfectScrollbar>
        {" "}
        <div className=" border border-gray-200 shadow sm:rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div className="">
              {displayImages.length === 1 ? (
                <div className="image-grid-item">
                  <img
                    className="mx-auto h-40 w-40"
                    src={`${BASE_URL}/${displayImages[0].replace(/\\/g, "/")}`}
                    alt="Tour Image"
                  />
                </div>
              ) : displayImages.length > 1 ? (
                <Slider {...sliderSettings} className=" mb-5">
                  {displayImages.map((image, index) => (
                    <div key={index} className="image-grid-item">
                      <img
                        className="mx-auto h-40 w-40"
                        src={`${BASE_URL}/${image.replace(/\\/g, "/")}`}
                        alt={`Tour Image ${index + 1}`}
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                <div className="col-span-2 flex h-full items-center justify-center">
                  Không có hình ảnh
                </div>
              )}
            </div>
            <div className="">
              {displayVideos.length === 1 ? (
                <div className="image-grid-item">
                  <video
                    className="mx-auto h-40 w-40"
                    src={`${BASE_URL}/${displayVideos[0].replace(/\\/g, "/")}`}
                    controls
                  />
                </div>
              ) : displayVideos.length > 1 ? (
                <Slider {...sliderSettingsVideo} className=" mb-5">
                  {displayVideos.map((video, index) => (
                    <div key={index} className="image-grid-item">
                      <video
                        className="mx-auto h-40 w-40"
                        src={`${BASE_URL}/${video.replace(/\\/g, "/")}`}
                        alt={`Tour video ${index + 1}`}
                        controls
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                <div className="col-span-2 flex h-full items-center justify-center">
                  Không có video
                </div>
              )}
            </div>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="divide-y divide-gray-200 bg-white">
              {[
                { title: "Mã tour", detail: tour._id },
                {
                  title: "Loại tour",
                  detail: tour.tourType.typeName || "Không thuộc loại tour nào",
                },
                {
                  title: "Danh mục tour",
                  detail:
                    tour.tourDirectory.directoryName ||
                    "Không thuộc danh mục nào",
                },
                {
                  title: "Hướng dẫn viên",
                  detail: tour.userGuide?.name || "Đang cập nhật",
                },
                {
                  title: "Khuyến mãi",
                  detail:
                    tour.promotion?.namePromotion || "Không có khuyến mãi",
                },
                { title: "Tour", detail: tour.nameTour },
                {
                  title: "Số chỗ",
                  detail: tour.maxParticipants,
                },
                { title: "Khu vực", detail: formatRegion(tour.regions) },
                {
                  title: "Ngày khởi hành",
                  detail: formatDateVN(tour.startDate),
                },
                { title: "Ngày kết thúc", detail: formatDateVN(tour.endDate) },
                { title: "Nơi tập trung", detail: tour.startingGate },
                {
                  title: "Thời gian tập trung",
                  detail: formatDateVNWithTime(tour.convergeTime),
                },
                {
                  title: "Giá khách (trên 16 tuổi)",
                  detail: formatPriceWithPromotion(
                    tour.price,
                    tour.originalPrice,
                    Boolean(tour.promotion),
                  ),
                },
                {
                  title: "Giá khách (6-16 tuổi)",
                  detail: formatPriceWithPromotion(
                    tour.priceForChildren,
                    tour.originalPriceForChildren,
                    Boolean(tour.promotion),
                  ),
                },
                {
                  title: "Giá khách dưới 6 tuổi",
                  detail: formatPriceWithPromotion(
                    tour.priceForYoungChildren,
                    tour.originalPriceForYoungChildren,
                    Boolean(tour.promotion),
                  ),
                },
                {
                  title: "Phương tiện di chuyển",
                  detail: tour.transport,
                },
                {
                  title: "Phí phụ thu",
                  detail: formatPrice(tour.additionalFees),
                },
                {
                  title: "Quy định",
                  detail: (
                    <div className="overflow-hidden">
                      <HTMLRenderer
                        htmlString={tour.description}
                        className="w-full"
                        style={{ maxWidth: "1024px" }}
                      />
                    </div>
                  ),
                },
                {
                  title: "Lịch trình",
                  detail: (
                    <div
                      className="max-w-4xl rounded-xl p-4"
                      style={{ maxWidth: "1024px", width: "100%" }}
                    >
                      <div className="overflow-hidden">
                        <HTMLRenderer
                          htmlString={tour.schedule}
                          className="w-full"
                          style={{ maxWidth: "1024px" }}
                        />
                      </div>
                    </div>
                  ),
                },
              ].map((row) => (
                <tr key={row.title}>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                    {row.title}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {row.detail}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PerfectScrollbar>
    </div>
  );
};

export default TourDetail;
