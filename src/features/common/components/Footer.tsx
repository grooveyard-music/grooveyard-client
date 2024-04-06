import { Container } from "@mantine/core";


export function Footer() {
  
  return (
    <footer className="bg-white text-white min-h-44 border-t-4 mt-20">
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-start py-8">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-indigo-600">Grooveyard<sup className="text-xs">®</sup></h1>
          <a href="mailto:hello@grooveyard.com" className="text-indigo-400 hover:text-indigo-300 mt-4">Get in touch! ✉️ hello@grooveyard.com</a>
        </div>
        <div className="flex flex-col items-end">
          <div className="mb-4">
            <a href="/terms" className="text-gray-400 hover:text-gray-300">Terms & Conditions</a>
            <span className="mx-2">|</span>
            <a href="/privacy" className="text-gray-400 hover:text-gray-300">Privacy Policy</a>
          </div>
          <p className="text-xs text-gray-500">Copyright © 2010-2023 Typeset. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
  )
}
