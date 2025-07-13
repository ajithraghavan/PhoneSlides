# PhoneSlides
![](banner-logo.png)

**PhoneSlides** is built for this new reality.

It’s not just a presentation tool — it’s a storytelling studio in your pocket.

## With PhoneSlides, you can:

    🖼️ Create vertical presentations designed specifically for mobile viewers

    🎤 Record your screen and your voice, walk through your slides, and tell your story

    📲 Post to any platform — Reels, Shorts, Stories, or even WhatsApp

Whether you're an educator, creator, coach, or entrepreneur, PhoneSlides helps you present smarter, faster, and vertically — the way the world watches today.

A responsive mobile-first slideshow presentation application built with pure HTML, CSS, and JavaScript. Unlike traditional presentation apps designed for wide screens, PhoneSlides is optimized for mobile devices in portrait orientation.

## Features

- **Mobile-First Design**: Optimized for vertical/portrait mobile view
- **Touch Controls**: Swipe left/right to navigate slides
- **Keyboard Support**: Arrow keys, Home/End navigation
- **Multiple Transitions**: Slide, fade, and flip animations
- **Responsive Layout**: Adapts to different screen sizes
- **Visual Indicators**: Dot indicators showing current slide
- **Clean UI**: Modern card-based design with gradient background

## How to Use

### Basic Setup

1. **Clone or download** the `PhoneSlides_Example` project
2. **Open `index.html`** in a web browser
3. **View on mobile device** or use browser's mobile view for best experience

### Adding Your Content

1. **Edit `slidesData.js`** to customize your slides:

```javascript
const slidesData = [
    {
        "slider": 0,
        "title": "Your Slide Title",
        "description": "Your slide description goes here",
        "image": "path/to/your/image.png"
    },
    {
        "slider": 1,
        "title": "Second Slide",
        "description": "Another slide description",
        "image": "path/to/another/image.png"
    }
];
```

2. **Add your images** to the `images/` folder
3. **Update image paths** in `slidesData.js` to match your files

### Navigation Controls

- **Touch**: Swipe left/right to navigate
- **Keyboard**: 
  - Arrow keys (←/→) for previous/next
  - Home key for first slide
  - End key for last slide
- **Indicators**: Tap the dots at the bottom to jump to specific slides

### Customization

**Transition Effects**: 
- Modify the `currentTransition` variable in `script.js`
- Available options: `'slide'`, `'fade'`, `'flip'`

**Styling**: 
- Edit `styles.css` to change colors, fonts, and layout
- Modify the gradient background in the `body` selector
- Adjust card dimensions in the `.slide` class

## File Structure

```
src/
├── index.html          # Main HTML file
├── script.js           # JavaScript functionality
├── slidesData.js       # Slide content data
├── styles.css          # Styling and animations
├── images/             # Image assets for Slides
```

## Technical Details

- **Pure Web Technologies**: No external dependencies
- **Responsive Design**: CSS media queries for different screen sizes
- **Touch Events**: Native touch event handling for swipe gestures
- **Modern CSS**: Flexbox layout, CSS animations, and gradients
- **Accessibility**: Keyboard navigation support

## Browser Support

- Modern mobile browsers (Chrome, Safari, Firefox)
- Desktop browsers with mobile view
- Touch-enabled devices recommended

## Example Use Cases

- Educational presentations
- Product showcases
- Portfolio displays
- Tutorial walkthroughs
- Mobile-first presentations

## Getting Started

1. **Prepare your content**: Gather titles, descriptions, and images
2. **Edit `slidesData.js`**: Add your slide data
3. **Add images**: Place images in the `images/` folder
4. **Test**: Open `index.html` in a mobile browser
5. **Customize**: Modify styles and transitions as needed

## Contributing

This is a lightweight, standalone project. Feel free to fork and modify for your needs.

## License

Open source project - feel free to use and modify as needed.