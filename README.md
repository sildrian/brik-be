Backend 
 - endpoint login = http://localhost:3000/login (post)
   	- username : halo
   	- password : asdfg
 - endpoint create user = http://localhost:3000/users (post)
   	- json body : 
{
    "username": "halo",
    "password": "asdfg"
}
- endpoint create products = http://localhost:3000/products (post)
	- json body :
	{ 
   		 "categoryid": 1,
   		 "categoryname": "kategori 1",
    		"sku": "MHZVTK",
    		"name": "ciki-ciki",
    		"description": "Delicious Ciki ciki, only at our general store",
    		"weight": 500,
    		"width": 5,
    		"length": 5,
    		"height": 5,
    		"image": "https://cf.shopee.co.id/file/7cb930d1bd183a435f4fb3e5cc4a896b",
    		"price": 100
}

- endpoint get products = http://localhost:3000/products?search=&page=1&limit=10
 (get)
- endpoint get product detail = http://localhost:3000/products/3
 (get)
