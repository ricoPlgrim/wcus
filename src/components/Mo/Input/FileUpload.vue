<template>
  <div class="file-type img">
    <div :style="imgBoxStyle" class="img-box" ref="imgBox">
      <span v-for="(image, index) in images" :key="index" class="thumbnail">
        <img :src="image.src" :title="image.name" />
        <button class="btn-clear" @click="removeImage(index)">Remove</button>
      </span>
    </div>
    <label for="input-file" class="btn-upload" v-if="images.length < 4"></label>
    <input type="file" id="input-file" multiple @change="handleFileUpload" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// 컴포넌트 이름 설정
defineOptions({
  name: 'FileUpload'
});

// 이미지 파일 인터페이스 정의
interface ImageFile {
  src: string;
  name: string;
}

// 이미지 리스트와 이미지 박스 참조값 정의
const images = ref<ImageFile[]>([]);
const imgBox = ref<HTMLDivElement | null>(null);

// 파일 업로드 핸들러
const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  
  // 파일이 존재하는지 확인
  if (target.files) {
    const files = Array.from(target.files);

    // 각 파일에 대해 처리
    files.forEach(file => {
      const fileType = file.type.toLowerCase();
      const fileSizeMB = file.size / (1024 * 1024); // 파일 크기를 MB로 변환

      // 이미지 파일(jpg, png) 처리
      if (fileType === 'image/jpeg' || fileType === 'image/png') {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target?.result) {
            // 이미지를 이미지 리스트에 추가
            images.value.push({
              src: e.target.result.toString(),
              name: file.name,
            });
          }
        };
        reader.readAsDataURL(file);
      }
      // 비디오 파일(mp4) 처리
      else if (fileType === 'video/mp4') {
        // 파일 크기 체크 - 100MB 초과 시 업로드 불가
        if (fileSizeMB > 100) {
          alert('100MB 이하의 영상만 업로드할 수 있습니다.');
        } else {
          createThumbnailFromVideo(file); // 비디오로부터 썸네일 생성
        }
      } else {
        alert('jpg, png 이미지 또는 mp4 영상만 업로드할 수 있습니다.');
      }
    });
  }
};

// 비디오로부터 썸네일 생성 함수
const createThumbnailFromVideo = (file: File) => {
  const video = document.createElement('video'); // 비디오 엘리먼트 생성
  video.src = URL.createObjectURL(file); // 비디오 URL 설정
  video.muted = true; // 비디오 음소거
  video.playsInline = true; // 인라인 재생 설정

  // 비디오 데이터가 로드되면 1초로 이동
  video.addEventListener('loadeddata', () => {
    video.currentTime = 1; // 첫 번째 프레임 대신 1초로 설정
  });

  // 비디오가 1초에 도달하면 캔버스에 그려서 썸네일 생성
  video.addEventListener('seeked', () => {
    const canvas = document.createElement('canvas'); // 캔버스 생성
    const context = canvas.getContext('2d');
    
    if (context) {
      // 캔버스 크기를 비디오 크기로 설정
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // 비디오의 현재 프레임을 캔버스에 그리기
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // 캔버스 데이터를 이미지 썸네일로 변환
      const thumbnailSrc = canvas.toDataURL('image/jpeg');
      images.value.push({
        src: thumbnailSrc,
        name: file.name,
      });

      // 메모리 해제를 위해 비디오 URL 해제
      URL.revokeObjectURL(video.src);
    }
  });
};

// 이미지 제거 함수
const removeImage = (index: number) => {
  images.value.splice(index, 1); // 해당 인덱스의 이미지 제거
};

// 이미지 박스의 스타일 설정
const imgBoxStyle = computed(() => {
  return images.value.length > 0 ? { display: 'flex' } : {}; // 이미지가 있을 경우 flex로 표시
});
</script>
