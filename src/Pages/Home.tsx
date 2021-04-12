import React, { useEffect, useState } from 'react'
import Button from '../Components/Button'
import CheckBox from '../Components/CheckBox'
import Sorting from '../Components/Sorting'
import Filters from '../Components/Filters'

import { IconBenjamas, IconShoppingCart, IconFilters, IconDown, IconClose } from '../GlobalFiles/Icons'
import JsonData from './bejamas'
import './sass/Home.sass'

const Home = () => {
  const capitalize = (s: any) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
  const [sorting, setSorting] = useState('priceDown')
  const [openFilters, setOpenFilters] = useState(false)
  const [filters, setFilters] = useState({
    Category: [],
    PriceRange: [
      { name: 'Lower than $20', from: 0, to: 20, checked: true },
      { name: '$20 - $100', from: 20, to: 100, checked: false },
      { name: '$100 - $200', from: 100, to: 200, checked: false },
      { name: 'More $200', from: 200, checked: false },
    ],
  })
  const [productList, setProductList] = useState<any>({
    featurePhoto: {},
    listPhoto: [],
    filteredListPhoto: [],
    ready: false,
  })
  const [page, setPage] = useState(1)
  const [openCartList, setOpenCartList] = useState(false)
  const [cartList, setCartList] = useState<any>([])

  useEffect(() => {
    let newJsonData = JsonData.products.map((item: any) => ({ ...item, image: { src: item.image, alt: item.name } }))
    const newFeaturePhoto: any = newJsonData.find((product) => product.featured) || {}
    const newListPhoto: any = newJsonData.filter((product) => !product.featured)
    setProductList({
      featurePhoto: newFeaturePhoto,
      listPhoto: newListPhoto,
      filteredListPhoto: newListPhoto,
      ready: true,
    })
    let Category: any = {}
    newListPhoto.forEach((product: any) => {
      Category[product.category] = {}
    })
    let newCategorys: any = Object.keys(Category).map((item: any) => ({ name: item, checked: true }))

    setFilters({ Category: newCategorys, PriceRange: [...filters.PriceRange] })
  }, [])

  useEffect(() => {
    if (productList.ready) {
      let newListPhoto: any = [...productList.listPhoto]
      let newPriceRange: any = filters.PriceRange.find((range: any) => range.checked)
      console.log(newListPhoto)
      newListPhoto = newListPhoto.filter((product: any) =>
        filters.Category.filter((item: any) => item.checked).find((item: any) => item.name === product.category),
      )
      console.log('🎇', newListPhoto, newPriceRange)
      newListPhoto = newListPhoto.filter(
        (product: any) => product.price > newPriceRange.from && product.price <= newPriceRange?.to,
      )
      console.log(newListPhoto)
      setProductList({ ...productList, filteredListPhoto: newListPhoto })
    }
  }, [filters])

  const SortProducts = () => {
    let newFilteredListPhoto: any = [...productList.filteredListPhoto]
    switch (sorting) {
      case 'priceDown':
        newFilteredListPhoto = newFilteredListPhoto.sort((a: any, b: any) => (a.price < b.price ? 1 : -1))
        break
      case 'priceUp':
        newFilteredListPhoto = newFilteredListPhoto.sort((a: any, b: any) => (a.price > b.price ? 1 : -1))
        break
      case 'AlphabeticalDown':
        newFilteredListPhoto = newFilteredListPhoto.sort((a: any, b: any) => (a.name > b.name ? 1 : -1))
        break
      case 'AlphabeticalUp':
        newFilteredListPhoto = newFilteredListPhoto.sort((a: any, b: any) => (a.name < b.name ? 1 : -1))
        break
    }
    setProductList({ ...productList, filteredListPhoto: newFilteredListPhoto })
  }

  useEffect(() => {
    if (productList.ready) {
      SortProducts()
    }
  }, [sorting])
  const handleFilterCheck = (filter: string, index: number) => {
    if (filter === 'Category') {
      let newCategorys: any = [...filters.Category]
      newCategorys[index].checked = !newCategorys[index].checked
      setFilters({ Category: newCategorys, PriceRange: filters.PriceRange })
    } else {
      let newPriceRange: any = [...filters.PriceRange]
      newPriceRange = newPriceRange.map((product: any) => ({ ...product, checked: false }))
      newPriceRange[index].checked = true
      setFilters({ Category: filters.Category, PriceRange: newPriceRange })
    }
  }

  const addProductToCart = (item: any) => {
    let newCartList = [...cartList]
    newCartList.push(item)
    setCartList(newCartList)
    setOpenCartList(true)
  }
  const removeProductToCart = (index: number) => {
    let newCartList = [...cartList]
    newCartList.splice(index, 1)
    setCartList(newCartList)
  }

  // Get array of pages for pagination
  const numberPages = Math.floor(productList.filteredListPhoto.length / 6) + 1
  let arrayPages: any = []
  for (let i = 0; i < numberPages; i++) {
    arrayPages.push(i + 1)
  }

  // Get list of product that belogn to the page
  const currentListPhoto: any = productList.filteredListPhoto.filter(
    (product: any, index: any) => index >= (page - 1) * 6 && index < page * 6,
  )
  return (
    <>
      <Filters
        filters={filters}
        open={openFilters}
        onClose={() => setOpenFilters(false)}
        setNewFilters={(newFilters: any) => setFilters(newFilters)}
      />
      <div className="ContainerHome">
        <div className="allPage">
          <section className="header">
            <div className="logo">
              <IconBenjamas />
            </div>
            <div className="car" onClick={() => setOpenCartList(!openCartList)}>
              <IconShoppingCart />
              {cartList.length ? <div className="cant">{cartList.length}</div> : null}
            </div>
            <div className={`shoppingCart ${openCartList ? 'show' : ''}`}>
              <div className="shoppingCart_content">
                {cartList.length ? (
                  cartList.map((product: any, index: number) => (
                    <div className="item" key={index}>
                      <div className="item_close" onClick={() => removeProductToCart(index)}>
                        <IconClose />
                      </div>
                      <div className="item_description">
                        <h4>{product.name}</h4>
                        <p>$ {product.price}</p>
                      </div>
                      <div className="item_image">
                        <img src={product.image.src} alt={product.image.alt} />
                      </div>
                    </div>
                  ))
                ) : (
                  <div>Empty Shopping Cart</div>
                )}
              </div>
              {cartList.length ? (
                <div className="shoppingCart_action">
                  <Button
                    text="CLEAR"
                    type="secondary"
                    onClick={() => {
                      setCartList([])
                      setOpenCartList(false)
                    }}
                  />
                </div>
              ) : null}
            </div>
          </section>
          <section className="featurePhoto">
            <div className="featurePhoto_title">
              <h1>{productList.featurePhoto?.name}</h1>
              <Button text={'ADD TO CART'} onClick={() => addProductToCart(productList.featurePhoto)} />
            </div>
            <div className="featurePhoto_image">
              <img src={productList.featurePhoto?.image?.src} alt={productList.featurePhoto?.image?.alt} />
              <div className="dayPhoto">Photo of the day</div>
            </div>
            <div className="featurePhoto_button">
              <Button text={'ADD TO CART'} onClick={() => addProductToCart(productList.featurePhoto)} />
            </div>
            <div className="featurePhoto_details">
              <div className="featurePhoto_details__description">
                <p className="title">About {productList.featurePhoto?.name}</p>
                <p className="category">{productList.featurePhoto?.category}</p>
                <p className="description">{productList.featurePhoto?.details?.description}</p>
              </div>
              <div className="featurePhoto_details__related">
                <h2 className="title">People also buy</h2>
                <div className="images">
                  {productList.featurePhoto?.details?.recommendations.map((image: any, index: number) => (
                    <div className="images__item" key={index}>
                      <img src={image.src} alt={image.alt} />
                    </div>
                  ))}
                </div>
                <div className="details">
                  <h3 className="details__title">Details</h3>
                  <p>
                    Dimmentions: {productList.featurePhoto?.details?.dimmentions?.width} x{' '}
                    {productList.featurePhoto?.details?.dimmentions?.height} pixel
                  </p>
                  <p>Size: {Math.floor(productList.featurePhoto?.details?.size / 1000)} mb</p>
                </div>
              </div>
            </div>
          </section>
          <div className="ProductsListHeader">
            <h4>
              Photography / <span>Premium Photos</span>
            </h4>
            <div className="Sorting">
              <Sorting
                current={sorting}
                onChange={(name: any) => {
                  console.log(name)
                  setSorting(name)
                }}
              />
            </div>
            <div className="filters" onClick={() => setOpenFilters(true)}>
              <IconFilters />
            </div>
          </div>

          <section className="ProductsList">
            <div className="filters">
              <div className="filters__filter lineBottom">
                <div className="filters__filter_title">Category</div>
                <div className="filters__filter_options">
                  {filters.Category.map((category: any, index: number) => (
                    <div className="option" key={index}>
                      <CheckBox checked={category.checked} onChange={() => handleFilterCheck('Category', index)} />
                      <p>{capitalize(category.name)}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="filters__filter">
                <div className="filters__filter_title">Price Range</div>
                <div className="filters__filter_options">
                  {filters.PriceRange.map((range: any, index: number) => (
                    <div className="option" key={index}>
                      <CheckBox checked={range.checked} onChange={() => handleFilterCheck('PriceRange', index)} />
                      <p>{capitalize(range.name)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="products">
              <div className="products_list">
                {currentListPhoto.map((product: any, index: any) => (
                  <div className="product" key={index}>
                    <div className="product__image">
                      {product.bestseller && <div className="bestSeller">Best Seller</div>}
                      <img src={product.image.src} alt={product.image.alt} />
                      <Button text="ADD TO CART" onClick={() => addProductToCart(product)} />
                    </div>
                    <p className="product__category">{capitalize(product.category)}</p>
                    <h3 className="product__name">{product.name}</h3>
                    <p className="product__price">${product.price}</p>
                  </div>
                ))}
              </div>

              <div className="products_pagination">
                <div className={`left ${page === 1 ? 'hide' : 'show'}`} onClick={() => setPage(page - 1)}>
                  <IconDown />
                </div>
                {arrayPages.map((pageNum: any, index: number) => (
                  <div
                    key={index}
                    className={`page ${pageNum === page ? 'current' : ''}`}
                    onClick={() => setPage(pageNum)}
                  >
                    {pageNum}
                  </div>
                ))}
                <div className={`right ${page === numberPages ? 'hide' : 'show'}`} onClick={() => setPage(page + 1)}>
                  <IconDown />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
export default Home
