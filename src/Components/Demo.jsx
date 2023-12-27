import React from "react";
import { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";
const Demo = () => {
  const [copied , setCopied] =useState('')
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [getSummary, { error, isLoading }] = useLazyGetSummaryQuery();
  const [allArticles, setAllArticles] = useState([]);

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );
    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);
  const handleSubmit = async (e) => {
    console.log(isLoading)
    e.preventDefault();
    const data = await getSummary({ articleUrl: article.url });
    if (data?.data.summary) {
      const newArticle = { ...article, summary: data.data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];
      setArticle(newArticle);
      setAllArticles(updatedAllArticles);
      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
      console.log(newArticle);
    }
  };
  const handleCopy =(copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(()=> setCopied(false),2000);
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link"
            className="absolute left-0 my-2 ml-3 w-5 "
          />
          <input
            type="url"
            placeholder="Enter a Url"
            value={article.url}
            onChange={(e) => {
              setArticle({ ...article, url: e.target.value });
            }}
            required
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700
        peer-focus:text-gray-700"
          >
            ⏎
          </button>
        </form>
        {/* browser history */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className="link_card"
            >
              <div className="copy_btn"
              onClick={()=>{handleCopy(item.url)}}>
                <img
                  src={copied === item.url ? tick : copy}
                  alt="copy_btn"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p>{item.url}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="my-10 max-w-full flex justify-center">
        { isLoading ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            Well that wasn't supposed to happend <br />
            <span className="font-satoshu font-normal text-gray-700 ">
              {error?.data?.erro}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-gray-700">{article.summary}</p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
