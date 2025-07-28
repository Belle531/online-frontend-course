// tailwind.resume.config.js
module.exports = {
  content: ["./my-resume.html"],
  theme: {
    extend: {
      colors: {
        'blush-50': '#f9f2f2',
        'sage-600': '#6b8e7f',
        'stormy-blue': '#4a5568',
        'stormy-blue-light': '#718096',
        'slate-100': '#f3f6f9'
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'custom': '0 4px 12px rgba(0, 0, 0, 0.05)',
      },
    }
  },
  plugins: []
}