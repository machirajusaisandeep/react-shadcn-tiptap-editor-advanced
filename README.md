# Advanced Rich Text Editor with Shadcn + Tiptap

A modern, feature-rich text editor implementation combining the power of Shadcn UI components and Tiptap editor. This project showcases two variants of rich text editors: a basic version with essential formatting features and an advanced version with intelligent word replacement capabilities.

![Basic Editor Demo](./editor.gif)
![Advanced Editor Demo](./editorAdvance.gif)

## 🚀 Features

### Basic Rich Text Editor

- Full integration with Shadcn UI components
- Essential text formatting options
- Clean and intuitive interface
- Responsive design
- Real-time preview
- Keyboard shortcuts support

### Advanced Rich Text Editor

- All features from the basic editor
- Intelligent word replacement system
- Dictionary-like synonym suggestions
- Similar to Apple's lookup functionality
- Custom alias word support
- Real-time word detection and replacement

## 🛠️ Tech Stack

- **React** - Frontend library
- **Vite** - Build tool and development server
- **TypeScript** - Type safety and better developer experience
- **Shadcn UI** - High-quality UI components
- **Tailwind CSS** - Utility-first CSS framework
- **Tiptap** - Headless editor framework
- **Lucide Icons** - Beautiful icons

## 🚀 Getting Started

1. Clone the repository

```bash
git clone https://github.com/yourusername/your-repo-name.git
```

2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

## 📖 Usage

### Basic Editor

The basic editor component can be imported and used as follows:

```tsx
import { RichTextEditor } from "@/components/rich-text-editor";

export default function MyComponent() {
  return <RichTextEditor />;
}
```

### Advanced Editor

The advanced editor with word replacement features can be used like this:

```tsx
import { RichTextEditorAdvance } from "@/components/rich-text-editor-advance";

export default function MyComponent() {
  return <RichTextEditorAdvance />;
}
```

## ⚙️ Configuration

### Customizing Alias Words

You can customize the alias words in `src/constants/index.ts`:

```typescript
export const AliasWords = [
  { id: 1, word: "original", alias: "synonym" },
  // Add more entries as needed
];
```

## 🎨 Customization

The editor components are built with Shadcn UI and Tailwind CSS, making them highly customizable. You can modify the appearance by:

1. Adjusting Tailwind classes
2. Modifying Shadcn UI theme
3. Extending the editor's functionality through Tiptap extensions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Shadcn UI](https://ui.shadcn.com/) for the amazing UI components
- [Tiptap](https://tiptap.dev/) for the powerful editor framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

## 📧 Contact

Sandeep Machiraju - [LinkedIn](https://www.linkedin.com/in/sandepmachiraju/) - machirajusaisandeep@gmail.com
