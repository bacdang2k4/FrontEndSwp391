"use client"

import { useState, useEffect, useRef } from "react"
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  CalendarIcon, 
  UserIcon, 
  ArrowRightIcon,
  PlayIcon,
  SparklesIcon,
  ShieldCheckIcon,
  HeartIcon,
  AcademicCapIcon,
  ClockIcon,
  PhoneIcon,
  DocumentTextIcon,
  BellIcon,
  StarIcon
} from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"
import banner1 from "../../images/banner1.jpg"

const bannerSlides = [
  {
    id: 1,
    image: banner1,
    title: "Hệ thống Y tế Học đường Thông minh",
    subtitle: "FPT University HCM",
    description: "Nền tảng quản lý sức khỏe toàn diện cho học sinh với công nghệ hiện đại và quy trình chuyên nghiệp",
    ctaText: "Khám phá ngay",
    ctaLink: "/dashboard",
    bgGradient: "from-blue-600/90 via-indigo-600/80 to-purple-600/90",
    features: ["AI-Powered", "24/7 Support", "Secure & Private"]
  },
  {
    id: 2,
    image: "/placeholder.svg?height=600&width=1400",
    title: "Kiểm tra Sức khỏe Định kỳ",
    subtitle: "Chăm sóc toàn diện",
    description: "Lịch kiểm tra sức khỏe học kỳ 2 cho tất cả học sinh. Đảm bảo sức khỏe toàn diện với đội ngũ y bác sĩ chuyên nghiệp",
    ctaText: "Xem lịch kiểm tra",
    ctaLink: "/health-checkup",
    bgGradient: "from-emerald-600/90 via-green-600/80 to-teal-600/90",
    features: ["Professional Staff", "Modern Equipment", "Comprehensive Care"]
  },
  {
    id: 3,
    image: "/placeholder.svg?height=600&width=1400",
    title: "Dinh dưỡng Học đường",
    subtitle: "Phát triển toàn diện",
    description: "Chương trình dinh dưỡng khoa học được thiết kế bởi chuyên gia, đảm bảo sự phát triển tối ưu cho học sinh",
    ctaText: "Tải tài liệu",
    ctaLink: "/documents",
    bgGradient: "from-orange-600/90 via-amber-600/80 to-yellow-600/90",
    features: ["Expert Designed", "Balanced Nutrition", "Growth Focused"]
  },
  {
    id: 4,
    image: "/placeholder.svg?height=600&width=1400",
    title: "Phòng chống Dịch bệnh",
    subtitle: "An toàn tuyệt đối",
    description: "Hệ thống phòng chống dịch bệnh hiện đại với quy trình chuẩn quốc tế, đảm bảo môi trường học tập an toàn",
    ctaText: "Tìm hiểu thêm",
    ctaLink: "/blog",
    bgGradient: "from-purple-600/90 via-violet-600/80 to-indigo-600/90",
    features: ["International Standards", "Advanced Prevention", "Safe Environment"]
  },
]

const newsArticles = [
  {
    id: 1,
    title: "Hướng dẫn phòng chống cúm mùa cho học sinh",
    summary: "Các biện pháp hiệu quả để phòng ngừa cúm mùa trong môi trường học đường, bao gồm vệ sinh cá nhân và tăng cường sức đề kháng.",
    image: "/placeholder.svg?height=300&width=400",
    author: "BS. Nguyễn Thị Lan",
    date: "15/01/2025",
    category: "Sức khỏe",
    readTime: "5 phút đọc",
    isHot: true,
    views: "2.1k",
    priority: "high"
  },
  {
    id: 2,
    title: "Chế độ dinh dưỡng cân bằng cho trẻ em tuổi học đường",
    summary: "Menu dinh dưỡng khoa học giúp trẻ phát triển toàn diện về thể chất và trí tuệ, được khuyến nghị bởi chuyên gia dinh dưỡng.",
    image: "/placeholder.svg?height=300&width=400",
    author: "TS. Trần Văn Minh",
    date: "12/01/2025",
    category: "Dinh dưỡng",
    readTime: "7 phút đọc",
    isHot: false,
    views: "1.8k",
    priority: "medium"
  },
  {
    id: 3,
    title: "Tầm quan trọng của việc kiểm tra thị lực định kỳ",
    summary: "Phát hiện sớm các vấn đề về mắt ở trẻ em để có biện pháp can thiệp kịp thời, bảo vệ thị lực cho tương lai.",
    image: "/placeholder.svg?height=300&width=400",
    author: "BS. Lê Thị Hoa",
    date: "10/01/2025",
    category: "Khám sức khỏe",
    readTime: "4 phút đọc",
    isHot: false,
    views: "1.5k",
    priority: "medium"
  },
  {
    id: 4,
    title: "Cách xử lý khi trẻ bị sốt tại trường học",
    summary: "Quy trình chuẩn để xử lý tình huống trẻ bị sốt trong giờ học, đảm bảo an toàn và hiệu quả nhất.",
    image: "/placeholder.svg?height=300&width=400",
    author: "Y tá Phạm Thị Mai",
    date: "08/01/2025",
    category: "Cấp cứu",
    readTime: "6 phút đọc",
    isHot: true,
    views: "3.2k",
    priority: "high"
  },
  {
    id: 5,
    title: "Lợi ích của hoạt động thể chất đối với sức khỏe học sinh",
    summary: "Tập thể dục đều đặn không chỉ giúp cải thiện sức khỏe thể chất mà còn nâng cao khả năng học tập và tinh thần.",
    image: "/placeholder.svg?height=300&width=400",
    author: "ThS. Hoàng Văn Nam",
    date: "05/01/2025",
    category: "Thể chất",
    readTime: "8 phút đọc",
    isHot: false,
    views: "2.7k",
    priority: "low"
  },
  {
    id: 6,
    title: "Chăm sóc sức khỏe răng miệng cho trẻ em",
    summary: "Hướng dẫn chi tiết về cách chăm sóc răng miệng đúng cách, phòng ngừa sâu răng và các bệnh lý nha khoa.",
    image: "/placeholder.svg?height=300&width=400",
    author: "BS. Nha khoa Vũ Thị Lan",
    date: "03/01/2025",
    category: "Nha khoa",
    readTime: "5 phút đọc",
    isHot: false,
    views: "1.9k",
    priority: "low"
  },
]

const features = [
  {
    icon: HeartIcon,
    title: "Hồ sơ sức khỏe",
    desc: "Quản lý toàn diện thông tin sức khỏe học sinh với công nghệ bảo mật cao và giao diện thân thiện",
    color: "from-pink-500 to-rose-500",
    bgColor: "from-pink-50 to-rose-50",
    stats: "1,247+ hồ sơ",
    link: "/health-record"
  },
  {
    icon: ShieldCheckIcon,
    title: "Quản lý thuốc",
    desc: "Hệ thống theo dõi và quản lý thuốc thông minh, đảm bảo an toàn và hiệu quả trong việc điều trị",
    color: "from-cyan-500 to-blue-500",
    bgColor: "from-cyan-50 to-blue-50",
    stats: "98.5% độ chính xác",
    link: "/medical-send"
  },
  {
    icon: SparklesIcon,
    title: "Xử lý sự kiện y tế",
    desc: "Quy trình xử lý sự kiện y tế nhanh chóng và chuyên nghiệp với đội ngũ y tế 24/7",
    color: "from-red-500 to-orange-500",
    bgColor: "from-red-50 to-orange-50",
    stats: "< 5 phút phản hồi",
    link: "/dashboard"
  },
  {
    icon: ShieldCheckIcon,
    title: "Tiêm chủng",
    desc: "Quản lý lịch tiêm chủng thông minh với nhắc nhở tự động và theo dõi phản ứng sau tiêm",
    color: "from-blue-500 to-indigo-500",
    bgColor: "from-blue-50 to-indigo-50",
    stats: "100% theo dõi",
    link: "/vaccination"
  },
  {
    icon: AcademicCapIcon,
    title: "Kiểm tra y tế định kỳ",
    desc: "Chương trình kiểm tra sức khỏe định kỳ toàn diện với thiết bị hiện đại và báo cáo chi tiết",
    color: "from-green-500 to-emerald-500",
    bgColor: "from-green-50 to-emerald-50",
    stats: "Định kỳ 6 tháng",
    link: "/health-checkup"
  },
  {
    icon: ClockIcon,
    title: "Báo cáo & Thống kê",
    desc: "Dashboard thông minh với phân tích dữ liệu sức khỏe và báo cáo xu hướng theo thời gian thực",
    color: "from-yellow-500 to-amber-500",
    bgColor: "from-yellow-50 to-amber-50",
    stats: "Real-time data",
    link: "/dashboard"
  },
]

const quickAccess = [
  {
    icon: "🏥",
    title: "Khai báo hồ sơ sức khỏe",
    desc: "Cập nhật thông tin sức khỏe con em một cách nhanh chóng và bảo mật",
    color: "from-blue-500 to-cyan-500",
    link: "/health-record"
  },
  {
    icon: "💊",
    title: "Gửi thuốc cho trường",
    desc: "Đăng ký gửi thuốc với hướng dẫn chi tiết và theo dõi tình trạng",
    color: "from-purple-500 to-pink-500",
    link: "/medical-send"
  },
  {
    icon: "📅",
    title: "Lịch kiểm tra y tế",
    desc: "Xem lịch kiểm tra y tế định kỳ và đặt lịch hẹn trực tuyến",
    color: "from-green-500 to-teal-500",
    link: "/health-checkup"
  },
  {
    icon: "💉",
    title: "Lịch tiêm chủng",
    desc: "Theo dõi lịch tiêm chủng và nhận thông báo nhắc nhở tự động",
    color: "from-orange-500 to-red-500",
    link: "/vaccination"
  },
  {
    icon: "🚨",
    title: "Liên hệ y tế khẩn cấp",
    desc: "Đường dây nóng 24/7 cho các tình huống y tế khẩn cấp",
    color: "from-red-500 to-pink-500",
    link: "/contact"
  },
  {
    icon: "📚",
    title: "Tài liệu sức khỏe",
    desc: "Thư viện tài liệu y tế phong phú với nội dung cập nhật liên tục",
    color: "from-indigo-500 to-purple-500",
    link: "/documents"
  },
]

const stats = [
  { value: "1,247", label: "Học sinh đăng ký", icon: "👥", change: "+12%", trend: "up" },
  { value: "98.5%", label: "Tỷ lệ tiêm chủng đầy đủ", icon: "💉", change: "+2.1%", trend: "up" },
  { value: "456", label: "Sự kiện y tế đã xử lý", icon: "🚨", change: "+8%", trend: "up" },
  { value: "100%", label: "Phụ huynh hài lòng", icon: "⭐", change: "0%", trend: "stable" },
]


function HomeForm() {
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [currentNewsSlide, setCurrentNewsSlide] = useState(0)
  const [isNewsAutoPlay, setIsNewsAutoPlay] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  const heroRef = useRef(null)
  const observerRef = useRef(null)

  // Intersection Observer for animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // setIsVisible(prev => ({
            //   ...prev,
            //   [entry.target.dataset.animate]: true
            // }))
          }
        })
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    const elements = document.querySelectorAll('[data-animate]')
    elements.forEach(el => observerRef.current.observe(el))

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Auto-slide functionality for banner
  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isAutoPlay])

  // Auto-slide functionality for news
  useEffect(() => {
    if (!isNewsAutoPlay) return

    const interval = setInterval(() => {
      setCurrentNewsSlide((prev) => (prev + 1) % Math.ceil(newsArticles.length / 3))
    }, 5000)

    return () => clearInterval(interval)
  }, [isNewsAutoPlay])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const nextNewsSlide = () => {
    setCurrentNewsSlide((prev) => (prev + 1) % Math.ceil(newsArticles.length / 3))
  }

  const prevNewsSlide = () => {
    setCurrentNewsSlide((prev) => (prev - 1 + Math.ceil(newsArticles.length / 3)) % Math.ceil(newsArticles.length / 3))
  }

  return (
    <main className="w-full overflow-hidden bg-gray-50">
      

      {/* Hero Banner Section */}
      <section 
        ref={heroRef}
        className="relative w-full h-screen min-h-[700px] overflow-hidden"
        onMouseEnter={() => setIsAutoPlay(false)}
        onMouseLeave={() => setIsAutoPlay(true)}
      >
        {/* Background Slides */}
        <div className="absolute inset-0">
          {bannerSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
            >
              {/* Background Image with Parallax */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
                style={{
                  backgroundImage: `url(${slide.image || "/placeholder.svg"})`,
                  transform: `translate(${(mousePosition.x - 50) * 0.02}px, ${(mousePosition.y - 50) * 0.02}px) scale(1.1)`
                }}
              />
              
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient}`} />
              
              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center text-center text-white z-10">
                <div className="max-w-5xl mx-auto px-4">
                  <div className="mb-4">
                    <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4">
                      {slide.subtitle}
                    </span>
                  </div>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl lg:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
                    {slide.description}
                  </p>
                  <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {slide.features.map((feature, idx) => (
                      <span key={idx} className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-white/30">
                        ✓ {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => navigate(slide.ctaLink)}
                      className="bg-white text-gray-800 font-bold py-4 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                    >
                      {slide.ctaText}
                    </button>
                    <button
                      onClick={() => navigate("/contact")}
                      className="border-2 border-white text-white font-bold py-4 px-8 rounded-full hover:bg-white hover:text-gray-800 transition-all duration-300 transform hover:scale-105"
                    >
                      Liên hệ ngay
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Animated Background Elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full animate-pulse">
                  <PlayIcon className="w-8 h-8 text-white m-auto mt-12" />
                </div>
                <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-white/10 rounded-full animate-pulse animation-delay-1000">
                  <SparklesIcon className="w-6 h-6 text-white m-auto mt-9" />
                </div>
                <div className="absolute bottom-1/4 left-1/3 w-28 h-28 bg-white/10 rounded-full animate-pulse animation-delay-2000">
                  <ShieldCheckIcon className="w-7 h-7 text-white m-auto mt-10" />
                </div>
                <div className="absolute bottom-1/3 right-1/3 w-20 h-20 bg-white/10 rounded-full animate-pulse animation-delay-3000">
                  <HeartIcon className="w-5 h-5 text-white m-auto mt-7" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-6 z-20">
          {/* Dots Indicator */}
          <div className="flex space-x-3">
            {bannerSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-white scale-125 shadow-lg"
                    : "bg-white/50 hover:bg-white/75 hover:scale-110"
                }`}
                title={`Đi đến slide ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Slide counter */}
          <div className="bg-black/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
            {currentSlide + 1} / {bannerSlides.length}
          </div>
        </div>
      </section>

      {/* Quick Access Section - Moved up for better UX */}
      <section className="py-16 px-4 bg-white" data-animate="quickaccess">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Truy cập nhanh</h2>
            <p className="text-gray-600 text-lg">Các chức năng thường sử dụng nhất</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {quickAccess.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-2"
                onClick={() => navigate(item.link)}
              >
                <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <h4 className="text-sm font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors text-center line-clamp-2">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-600 text-center line-clamp-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50" data-animate="features">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Chức năng chính</h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">Hệ thống quản lý y tế học đường toàn diện và hiện đại, được thiết kế để đảm bảo sức khỏe tối ưu cho học sinh</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl shadow-xl p-8 text-center border border-gray-100 hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2 cursor-pointer"
                onClick={() => navigate(feature.link)}
              >
                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{feature.desc}</p>
                <div className="inline-flex items-center gap-2 text-sm text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-full">
                  <StarIcon className="w-4 h-4" />
                  {feature.stats}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section
        className="py-20 px-4 bg-white"
        onMouseEnter={() => setIsNewsAutoPlay(false)}
        onMouseLeave={() => setIsNewsAutoPlay(true)}
        data-animate="news"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Tin tức sức khỏe</h2>
            <p className="text-gray-600 text-xl">Cập nhật thông tin y tế và sức khỏe học đường mới nhất</p>
          </div>

          {/* Featured News */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <BellIcon className="w-6 h-6 text-red-500" />
              Tin nổi bật
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {newsArticles.filter(article => article.isHot).slice(0, 2).map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2 border-l-4 border-red-500"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                      🔥 HOT
                    </div>
                    <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {article.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">{article.summary}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-2">
                        <UserIcon className="w-4 h-4" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{article.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blue-600 font-medium">{article.readTime}</span>
                      <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors group">
                        Đọc thêm
                        <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Regular News Carousel */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentNewsSlide * 100}%)` }}
            >
              {Array.from({ length: Math.ceil(newsArticles.filter(article => !article.isHot).length / 3) }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                    {newsArticles.filter(article => !article.isHot).slice(slideIndex * 3, slideIndex * 3 + 3).map((article) => (
                      <div
                        key={article.id}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2"
                      >
                        <div className="relative overflow-hidden">
                          <img
                            src={article.image || "/placeholder.svg"}
                            alt={article.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {article.category}
                          </div>
                        </div>

                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">{article.summary}</p>

                          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                            <div className="flex items-center gap-2">
                              <UserIcon className="w-4 h-4" />
                              <span>{article.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CalendarIcon className="w-4 h-4" />
                              <span>{article.date}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-blue-600 font-medium">{article.readTime}</span>
                            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors group">
                              Đọc thêm
                              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* News Navigation Arrows */}
            <button
              onClick={prevNewsSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg text-gray-800 p-3 rounded-full hover:bg-gray-50 transition-all duration-200 z-10"
              title="Tin tức trước"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>

            <button
              onClick={nextNewsSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg text-gray-800 p-3 rounded-full hover:bg-gray-50 transition-all duration-200 z-10"
              title="Tin tức tiếp theo"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>

          {/* News Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(newsArticles.filter(article => !article.isHot).length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentNewsSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentNewsSlide ? "bg-blue-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          {/* View All News Button */}
          <div className="text-center mt-12">
            <button
              onClick={() => navigate("/blog")}
              className="inline-flex items-center gap-3 bg-blue-600 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              <DocumentTextIcon className="w-5 h-5" />
              Xem tất cả tin tức
              <ArrowRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 py-20 px-4 text-white" data-animate="stats">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Thống kê hệ thống</h2>
            <p className="text-blue-100 text-xl">Năm học 2024-2025</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="bg-white/10 rounded-3xl p-8 shadow-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300 group">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
                  <h3 className="text-3xl md:text-4xl font-extrabold mb-2">{stat.value}</h3>
                  <p className="text-blue-100 mb-2">{stat.label}</p>
                  <div className={`text-sm font-semibold flex items-center justify-center gap-1 ${
                    stat.trend === 'up' ? 'text-green-300' : stat.trend === 'down' ? 'text-red-300' : 'text-yellow-300'
                  }`}>
                    {stat.trend === 'up' && '↗'}
                    {stat.trend === 'down' && '↘'}
                    {stat.trend === 'stable' && '→'}
                    {stat.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Sẵn sàng bắt đầu?</h2>
          <p className="text-xl mb-8 opacity-90">
            Tham gia hệ thống quản lý y tế học đường thông minh ngay hôm nay để đảm bảo sức khỏe tốt nhất cho con em bạn
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/login")}
              className="bg-white text-green-600 font-bold py-4 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Đăng nhập ngay
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="border-2 border-white text-white font-bold py-4 px-8 rounded-full hover:bg-white hover:text-green-600 transition-all duration-300 transform hover:scale-105"
            >
              Liên hệ tư vấn
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomeForm