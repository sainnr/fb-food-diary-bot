![Yet another logo](https://res.cloudinary.com/dntumlq4w/image/upload/v1593014794/food/logo_wdd8yt.png)

Devpost hackathon project: check https://devpost.com/software/how-was-your-lunch for context.

## Inspiration
A healthy diet plays the role of one of the most important factors of human health. As proven multiple times by researchers and nutritionists, one of the key ingredients here is to have a sustainable diet. This is all about developing a habit that you can follow every day, through your normal life or lockdown situations as we have now.

The market is full of various assorted apps that aim to help with controlling food consumption and tracking. Users often spend time building trust with them and trying to create a habit, often finding the process impractical or way too artificial.

How Was Your Lunch is designed to help with nutrition tracking in the most natural way -- through your normal communication. Every day we share millions of food photos on Instagram and tell our friends how yummy was that avocado toast from your local cafe that you had for breakfast. And it feels quite natural, doesn't it?

So instead of installing yet-another-diet-tracking-app, why don't we chat about your daily meals to just another contact in your Facebook Messenger? 

![Submitting a picture and checking summary](https://res.cloudinary.com/dntumlq4w/video/upload/e_loop/v1593014846/food/IMG_1028_wtvbkz.gif)

How Was your lunch will recognize your language and carefully record this for you, thanks to Wit.Ai Natural Language Processing (NLP) platform. Moreover, it will try to estimate the nutrition facts for the dish that you named (as accurate as it can!), so you can check your daily stats. Of course, the text messages aren't just enough, so you can also share images that How Was Your Lunch will try to recognize and find the best match (again, with nutrition facts). To add to your diary, it will ask you for the mealtime, with Messenger's Quick Replies. With new features to come, you could also leave a voice message if you're in a hurry or just don't feel like typing text.

To keep an impression of talking with the real person, the app has been made to reply and answer to your text with the human language as well. No doubt, sticking to the diet is often hard and any good motivation is important. This is why How Was Your Lunch learns to be a good friend as well and show empathy & support to you.

In future releases, it will carefully guide you as you move on during the day with your meals and help to stay on track, whether your goal is to reduce daily calories, eat more vegs & fibre or stay on a high protein or keto diet.

## Technology
How Was Your Lunch is completely integrated into Facebook Pages & Messenger, so no installation needed, just subscribe to the How Was Your Lunch page and start chatting!

The complex but amusing technology layer of NLP and imaging AI is kept completely transparent to a user, exposing only a natural language communication.

![Submitting a picture](https://res.cloudinary.com/dntumlq4w/video/upload/e_loop/v1593014846/food/IMG_1027_wtvbkz.gif)

### Messenger API
Facebook Messenger creates the foundation for the How Was Your Lunch app, connecting it with the user that came to the Facebook page of How Was Your Lunch. Apart from text messages processing and a seamlessly integrated NLP Layer (see below), How Was Your Lunch uses template messages with button replies. It also relies on Quick Replies functionality to instantly ask for the mealtime, when user wants to add a dish from the picture.

![Submitting a meal with text](https://res.cloudinary.com/dntumlq4w/video/upload/e_loop/v1593014846/food/IMG_1022_wtvbkz.gif)

### NLP layer
How Was Your Lunch relies on the Wit.Ai platform to understand users intent, be it saving a meal or asking for summary. It is aware of several common dishes and can grow to learn more. With Wit.Ai, the app extracts mealtimes (automatic assignment based on the current time -- to come) and creates a structured summary, if asked for today, yesterday or for the entire week.

![Asking for a summary](https://res.cloudinary.com/dntumlq4w/video/upload/e_loop/v1593014846/food/IMG_1023_wtvbkz.gif)

### Image recognition layer
The app integrates with an outstanding image processing service that performs recognition. So when the user shares a photo, it gets forwarded for ML recognition which in turn results in the details about the dish, including calories & nutrition facts. For demo purposes, it temporarily uses [caloriemama.ai sample API](http://caloriemama.ai/api) which has certain limitations but can be replaced with the real one.

### Server side
Under the hood, this is a NodeJS application that uses ExpressJS to handle requests and stores data 

## Try out
The technology is in the early prototype stage, so access is limited. If you have already got access, you can follow the steps below:
1. Visit the page and start messaging.
2. For text commands, use something along these lines: "I made boiled eggs for breakfast" or "Got a bag of crisps for a snack".
3. For images, please use examples from here: http://caloriemama.ai/api
4. To show a summary, you can ask like this: "What's the summary for today?"

Feel free to contact if any questions.

## What's next
This all creates a wonderful ensemble of a friendly assistant that would help you to stay on the track with any of your nutrition plans. Chat with it or share photos like with other friends, and How Was Your Lunch will do the rest.

As briefly mentioned above, there's plenty of more ideas that can be incorporated in the application. To name a few possible directions here:
- Personal dietary goals: 5 vegs a day, staying low calories or keto etc.
- Small talks and chatter: learn a few tricks to amuse users and keep engaged
- Broader nutrition facts: not just calories, enhance with proteins/carbs/fats
- Extended food base: learn more basic foods and various recipes
- Robust image AI: switch to the practical ML model that'd cope with real-life images
