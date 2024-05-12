import React, { useState } from 'react';
import FAQ_Child from '../../Component/FAQ/FAQ_Child';

const FAQ = () => {
    const [StateOpen, setStateOpen] = useState(1)
    const [items, setItems] = useState([
        {
        id: 1,
        question: 'What is React?',
        answer:
            'React is a JavaScript library for building user interfaces. It was developed by Facebook and is now maintained by a community of developers.'
        },
        {
        id: 2,
        question: 'What is Tailwind CSS?',
        answer:
            'Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces. It provides a set of pre-defined classes that can be used to style HTML elements.'
        },
        {
        id: 3,
        question: 'How do I install React?',
        answer:
            'You can install React by running the following command in your terminal: npm install react'
        },
        {
        id: 4,
        question: 'How do I install Tailwind CSS?',
        answer:
            'You can install Tailwind CSS by running the following command in your terminal: npm install tailwindcss'
        }
    ]);


  return (
    <>
    <section className="bg-white dark:bg-gray-900">
    <div className="container px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 lg:text-3xl dark:text-white">Frequently Asked Questions</h1>

        <div>
            {
                items.map((item,i)=>{
                    return <FAQ_Child item={item} key={i+1} setStateOpen={setStateOpen} StateOpen={StateOpen} />
                })
            }
        </div>
    </div>
</section>
    </>
  );
};

export default FAQ;