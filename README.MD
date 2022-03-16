```js
const { robotFabric } = require('robot-post')

const robotPost = new robotFabric({
  stateEmail: "user@email.com",
  statePass: "user_password"
});
const robotPostFunction = async () => {
  await robotPost.createRobotDummy()
  await robotPost.runFacebookPostDummy({
    title: 'item post title',
    price: 'item post price',
    details: 'item post details',
    cover: 'C:/dirExample/dirExample/dirExample/dirExample/dirname_example_wehere_are_your_items_pics/name_of_image_you_want_on_cover.jpg',
    dirPathPhotos: 'C:/dirExample/dirExample/dirExample/dirExample/dirname_example_wehere_are_your_items_pics/',
  }, itemCondition, defaultLabelOnTitleAndDescription, imageText, itemCategory)
}
robotPostFunction()
```

## **defaultLabelOnTitleAndDescription**
As the prop say's here you can put a string to be placed on title and description.

## **imageText**
Here you can put a string to be placed on the cover iamge.

## **itemCondition** default value `'new'`
### *itemCondition can be...*
- `'new'`
- `'used-new'`
- `'used-good'`
- `'used'` 


## **itemCategory** default value `'household'`
### *itemCondition can be...*
- `'tools'`
- `'furniture'`
- `'household'`
- `'garden'`
- `'appliances'`
- `'video_games'`
- `'books_movies_music'`
- `'bags_&_luggage'`
- `'women_clothes_&_shoes'`
- `'mens_clothes_&_shoes'`
- `'jewerly_&_accesories'`
- `'health_&_beauty'`
- `'pet_supplies'`
- `'baby_&_kids'`
- `'toys_&_games'`
- `'electronics_&_computers'`
- `'mobile_phones'`
- `'bicycles'`
- `'arts_&_crafts'`
- `'sports_&_outdoors'`
- `'auto_parts'`
- `'musical_instruments'`
- `'antiques_&_collectibles'`
- `'garage_sale'`
- `'miscellaneous'`

