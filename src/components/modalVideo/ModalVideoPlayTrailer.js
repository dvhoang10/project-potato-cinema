import ErrorComponent from "components/common/ErrorComponent";
import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import ModalVideo from "react-modal-video";
import { useDispatch, useSelector } from "react-redux";
import { setStatus } from "store/modelVideo/modalVideoSlice";

const ModalVideoPlayTrailer = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.modalVideo);
  return (
    <ModalVideo
      channel="youtube"
      youtube={{
        autoplay: 1,
        mute: 1,
      }}
      isOpen={status.isOpen}
      videoId={status.videoId}
      onClose={() => {
        dispatch(
          setStatus({
            ...status,
            isOpen: false,
          })
        );
      }}
    ></ModalVideo>
  );
};

export default withErrorBoundary(ModalVideoPlayTrailer, {
  FallbackComponent: ErrorComponent,
});
