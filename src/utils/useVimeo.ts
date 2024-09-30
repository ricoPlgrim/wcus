import { nextTick } from 'vue';
import type { Swiper as SwiperType } from 'swiper';
import Vimeo from '@vimeo/player';

// useVimeo 훅 정의
export function useVimeo() {
  // Vimeo 플레이어를 초기화하는 함수
  const initVimeo = (swiper: SwiperType | null) => {
    nextTick(() => { // Vue 렌더링이 완료된 후 실행
      let vimeoArea: NodeListOf<Element> | null = null;  // 비디오 영역을 저장할 변수
      let activeSwiper: Element | null = null;  // 현재 활성화된 스와이퍼 슬라이드를 저장할 변수

      if (swiper) {  // Swiper 인스턴스가 있는 경우
        vimeoArea = (swiper.el as HTMLElement).querySelectorAll('.video-area');  // 모든 비디오 영역을 선택
        activeSwiper = (swiper.el as HTMLElement).querySelector('.swiper-slide-active');  // 현재 활성화된 슬라이드 선택
      } else {  // Swiper 인스턴스가 없는 경우
        vimeoArea = document.querySelectorAll('.video-area.normal');  // 일반 비디오 영역을 선택
      }

      if (!vimeoArea || vimeoArea.length === 0) return;  // 비디오 영역이 없으면 반환

      const vimeoPlayers: Vimeo[] = [];  // Vimeo 플레이어를 저장할 배열

      vimeoArea.forEach((element, index) => {  // 각 비디오 영역에 대해 반복
        const iframe = element.querySelector('iframe') as HTMLIFrameElement;  // iframe 요소 선택
        if (!iframe) return;  // iframe이 없으면 다음으로 건너뛰기

        const controls = iframe.src.includes('controls');  // iframe src에 'controls' 포함 여부 확인
        element.setAttribute('data-index', index.toString());  // 인덱스를 data-index 속성으로 설정

        const player = new Vimeo(iframe);  // Vimeo 플레이어 인스턴스 생성
        vimeoPlayers[index] = player;  // Vimeo 플레이어를 배열에 저장
        player.setAutopause(false);  // 자동 일시 정지 기능 비활성화

        player.ready().then(() => {  // 플레이어가 준비되었을 때 실행
          if (controls) {  // controls가 있는 경우
            player.on('ended', () => {  // 비디오가 끝났을 때 실행
              const thumb = element.querySelector('.thumb') as HTMLElement;  // 썸네일 요소 선택
              if (thumb) {  // 썸네일이 있는 경우
                thumb.style.pointerEvents = 'auto';  // 썸네일의 포인터 이벤트 활성화
                thumb.style.opacity = '1';  // 썸네일의 불투명도 설정
                const img = thumb.querySelector('img');  // 썸네일 이미지 선택
                if (img) img.style.display = 'block';  // 이미지 표시
              }
            });
          }
        });
      });

      if (swiper) {  // Swiper 인스턴스가 있는 경우
        swiper.on('slideChangeTransitionStart', () => {  // 슬라이드 변경이 시작될 때 실행
          vimeoArea?.forEach((element, index) => {  // 모든 비디오 영역을 반복
            if (!element.classList.contains('loop')) {  // 루프가 아닌 경우
              vimeoPlayers[index].getCurrentTime().then((seconds) => {  // 현재 재생 시간을 가져옴
                if (Number(seconds) > 0) {  // 현재 시간이 0보다 크면
                  vimeoPlayers[index].pause();  // 비디오 일시 정지
                }
              });
            }
          });
        });

        swiper.on('slideChangeTransitionEnd', () => {  // 슬라이드 변경이 끝났을 때 실행
          handleVideoPlayback();  // 비디오 재생 처리 함수 호출
        });

        // 비디오 재생을 처리하는 함수
        const handleVideoPlayback = () => {
          activeSwiper = (swiper.el as HTMLElement).querySelector('.swiper-slide-active');  // 현재 활성화된 슬라이드 선택
          if (!activeSwiper) return;

          const activeVimeoIndex = activeSwiper.querySelector('.video-area')?.getAttribute('data-index');  // 활성화된 비디오 인덱스 선택
          if (!activeVimeoIndex) return;

          const videoArea = activeSwiper.querySelector('.video-area');  // 비디오 영역 선택
          const videoPlayer = vimeoPlayers[Number(activeVimeoIndex)];  // Vimeo 플레이어 선택

          if (videoArea && !videoArea.classList.contains('loop') && !activeSwiper.querySelector('.btn-play')) {
            if (swiper.autoplay) {
              swiper.autoplay.stop();  // 비디오 재생 전 Swiper 자동 재생 중지
            }

            videoPlayer.play().then(() => {  // 비디오 재생 성공 시
              if (swiper.autoplay) {
                swiper.autoplay.start();  // 비디오 재생 후 Swiper 자동 재생 재개
              }
            }).catch(() => {  // 비디오 재생 실패 시
              if (swiper.autoplay) {
                swiper.autoplay.start();  // 비디오 재생 실패 시에도 Swiper 자동 재생 재개
              }
            });
          }
        };

        handleVideoPlayback();  // 초기 비디오 재생 시도
      }
    });
  };

  return {
    initVimeo,  // initVimeo 함수를 반환하여 외부에서 사용할 수 있도록 함
  };
}
