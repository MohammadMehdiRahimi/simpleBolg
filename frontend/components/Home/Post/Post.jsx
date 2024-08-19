import React from "react";
import style from "./Post.module.css";
export default function Post() {
  return (
    <div
      className={
        "d-flex flex-column justify-content-center align-items-center  " +
        style.post
      }
    >
      <div className={"cursor-pointer  " + style.image}>
        <img
          src="https://th.bing.com/th/id/R.6743cb9021a910335c6a7f27de6f8e20?rik=UBykEik9KiH8Ow&pid=ImgRaw&r=0"
          alt=""
        />
      </div>
      <div className={"d-flex flex-column  " + style.wrapper}>
        <div
          className={
            "d-flex justify-content-between align-items-center  mt-3 fs-12 fw-bold  " +
            style.details
          }
        >
          <div
            className={
              "d-flex justify-content-start align-items-center cursor-pointer   " +
              style.category
            }
          >
            <span>طبیعت</span>
            <span>موسیقی</span>
          </div>
          <div className={"  " + style.time}> 1 ساعت پیش</div>
        </div>
        <div
          className={
            "fs-26 fw-bolder align-self-center my-3 cursor-pointer  " +
            style.title
          }
        >
          سفر به کیش
        </div>
      </div>
      <div className={"  " + style.describtion}>
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
        از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و
        سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
        متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه
        درصد گذشته حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم
        چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و
        برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود
        ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه درصد گذشته حال و
        آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت
        بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی رای شرایط فعلی
        تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می
        باشد کتابهای زیادی در شصت و سه درصد گذشته حال و آینده شناخت فراوان جامعه
        و متخصصان را می طلبد تا با نرم چاپگرها و متون بلکه روزنامه و مجله در
        ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و
        کاربردهای متنوع با هدف بهبود رای شرایط فعلی تکنولوژی مورد نیاز و
        کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در
        شصت و سه درصد گذشته حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد
        تا با نرم چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم
        است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود
      </div>
    </div>
  );
}
