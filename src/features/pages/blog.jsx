import React from "react";

const articles = [
  {
    title: 'Treat yourself without worrying about money',
    description: 'Our simple budgeting feature allows you to separate out your spending and set realistic limits each month. That means you …',
    imgPath: '/images/image-restaurant.jpg',
    imgAlt: 'someone eating a hamburger in a restaurant',
  },
  {
    title: 'Take your Easybank card wherever you go',
    description: 'We want you to enjoy your travels. This is why we don’t charge any fees on purchases while you’re abroad. We’ll even show you …',
    imgPath: '/images/image-plane.jpg',
    imgAlt: 'A plane in the sky',
  },
  {
    title: 'Our invite-only Beta accounts are now live!',
    description: 'After a lot of hard work by the whole team, we’re excited to launch our closed beta. It’s easy to request an invite through the site ...',
    imgPath: '/images/image-confetti.jpg',
    imgAlt: 'Falling confetti',
  },
  {
    title: 'Receive money in any currency with no fees',
    description: 'The world is getting smaller and we’re becoming more mobile. So why should you be forced to only receive money in a single …',
    imgPath: '/images/cash.jpeg',
    imgAlt: 'multiple bills with different values and currencies',
  },
];

const Blog = () => {
  return (
    <section className="py-14 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-10">
          <button className="w-[250px] text-white bg-[#092256] hover:bg-[#092256] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            What We Offer?
          </button>
        </div>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-20">
          {articles.map((article, index) => (
            <div key={index} className="px-4">
              <article className="bg-white shadow-md rounded overflow-hidden">
                <div className="aspect-w-16 aspect-h-10 lg:aspect-w-4 lg:aspect-h-3">
                  <img
                    className="object-cover w-full h-full rounded"
                    src={article.imgPath}
                    alt={article.imgAlt}
                  />
                </div>
                <div className="px-7 pt-5 pb-10 lg:p-6">
                  <h4 className="text-primary-dark-blue text-sm py-2 hover:text-green-400">
                    {article.title}
                  </h4>
                  <p className="text-neutral-grayish-blue text-xs">
                    {article.description}
                  </p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
