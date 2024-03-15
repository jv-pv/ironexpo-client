
const Footer = () => {
  return (
    <div className="flex items-center justify-between px-3 w-full h-8">
        <p className="text-blue-50">
          <a href="https://github.com/jv-pv" target="_blank" className="flex gap-1">
            <span className="text-white">John</span> 
                <img src="/github-circle.svg" alt="github-icon" className="w-5 h-5 self-center"/>
             <span className="text-lime-400">Pieri</span>
          </a>
        </p>
        <p className="text-blue-50">
          <span className="text-blue-400">IronHack</span> ✷ <span className="text-">2024</span>
        </p>
    </div>
  )
}

export default Footer