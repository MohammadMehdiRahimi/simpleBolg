import React from "react";
import style from "./Add.module.css";
export default function Add() {
  return (
    <div className="container">
      <div class={"row mt-4 " + style.wrapper}>
        <div className="col-8 offset-2 rounded  d-flex align-items-center flex-column justify-content-around">
          <input type="file" name="addFile" id="addFile" className="d-none" />
          <label htmlFor="addFile" className={"  " + style.imageWrapper}>
            <i class="fa-regular fa-image"></i>
            <span>اضافه کردن تصویر</span>
          </label>

          <form className={style.addTitle}>
            <div className={style.inputGroup}>
              <input type="text" placeholder="عنوان را وارد نمایید ... " />
              <div className={"  " + style.button}>
                <button>ارسال</button>
              </div>
            </div>
            <textarea
              name=""
              id="describtion"
              placeholder="متن مورد نظر را وارد نمایید ... "
            ></textarea>
          </form>
        </div>
      </div>
    </div>
  );
}
