## Next.js Dashboard backend for Bon Granel

I've been working many months on this project. I´ve learned a lot on the way and it´s still not finished. 
I am actually working with the business managament to improve the app and build the best and custom app for them

<a target="_blank" href="https://nextjs-dashboard-pi.vercel.app/">***Live Demo Here***</a>

## Read before

First, a few things.

- Responsive design is not implemented, Why?

The managament ask me to build a desktop application, they are not intend to use mobile devices. So I decided to skip this, at least, for the moment.
- I'm working on translation

I build this application in Spanish, it is one of my first complex projects. In the process of learning, I find easiest for me to code in Spanish, but I'm working on the translation. The live demo is almost translated.
- Is it 100% functional?

No, there are few sections that are working with Woocommerce and Rest API, you need that to make it works. Also, there are parts that work directly with the retail store, that for obvious reasons, I can't show here.

## How it works

- Sales:

A part of the sales is connected to the retail store and other part is connected to WooCommerce Api Rest.
I'm still working to improve Top Sales, Top profit products...

- Products:

The products are connected to a MySQL database in Bon Granel's hosting. I´ve used Prisma to make the connections between Next and MySQL.

- Suppliers:

In this section, we can manage the suppliers. The products are connected to these suppliers. 

- Orders:

I'm proud of this part and It was a very important demand from Bon Granel. We can make orders to the suppliers, depending on the supplier you choose, the list of products is different. You can make the order and save it. Once the real order arrives to the retail store, we can review it, mark it as review and then save it again. All the stock  will be updated by the order. This is a nice way to keep inventory updated with a few clicks.

- Expenses:

In this section, we can track all the expenses during the month. Check the incoming bills, how much money do we need to pay and check if the bill is payed o not.

- Batch Control:

This section is not functional on live demo because it only works between the app and an Express API installed in the retail store. 

- Ecommerce:

I filled this section with some dummy content because it is working directly with Woocommerce.


***I am still working on this project, my goal once I finished is to make a full Next.js Dashboard and make it available on my Github.***
