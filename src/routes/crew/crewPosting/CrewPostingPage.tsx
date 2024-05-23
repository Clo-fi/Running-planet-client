import { ChangeEvent, useRef, useState } from 'react';
import Form from './components/Form';
import ExpectedPost from './components/ExpectedPost';
import { Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/scrollbar';

const CrewPostingPage = () => {
  const [imgList, setImgList] = useState<File[]>([]);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');


  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageAdd = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImgList(prevList => [...prevList, ...files]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImgList(prevList => prevList.filter((_, i) => i !== index));
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
      <Swiper
        modules={[Scrollbar]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        <SwiperSlide
          style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
          <Form
            title={title} content={content}
            setTitle={setTitle} setContent={setContent}
            fileInputRef={fileInputRef}
            handleImageAdd={handleImageAdd} handleFileChange={handleFileChange}
          />
        </SwiperSlide>
        <SwiperSlide>
          <ExpectedPost
            title={title} content={content}
            imgList={imgList} setImgList={setImgList} handleRemoveImage={handleRemoveImage} />
        </SwiperSlide>
      </Swiper>


    </div>
  );
}

export default CrewPostingPage;
