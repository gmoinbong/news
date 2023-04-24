import React, { useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import style from '../styles/NewsPage.module.scss'
interface Props {
  newsText: string;
  id: string;
}

const EditNews: React.FC<Props> = ({ id }) => {

  const [newsText, setNewsText] = useState<string>()

  const updateNews = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    try {
      const newsDocument = doc(db, "news", id);
      await updateDoc(newsDocument, {
        text: newsText
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  const handleOnChangeNews = (e: React.ChangeEvent<HTMLTextAreaElement>) => setNewsText(e.target.value)

  return (
    <>
      <h5 className={style.titleChange} id="editLabel">Змінити новину</h5>
      <form>
        <textarea className={style.editPost} onChange={handleOnChangeNews} value={newsText} />
      </form>
      <button type="button"
        className="btn btn-primary"
        onClick={updateNews}>Застосувати зміни</button>
    </>
  )
}

export default EditNews