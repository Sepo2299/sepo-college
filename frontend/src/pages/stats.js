<section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white">

        <div className="container mx-auto grid md:grid-cols-3 gap-10 text-center">

          <div>
            <FaUserGraduate className="text-5xl text-yellow-300 mx-auto mb-4"/>
            <h3 className="text-4xl font-bold">5000+</h3>
            <p>Students</p>
          </div>

          <div>
            <FaChalkboardTeacher className="text-5xl text-yellow-300 mx-auto mb-4"/>
            <h3 className="text-4xl font-bold">120+</h3>
            <p>Lecturers</p>
          </div>

          <div>
            <FaGlobeAfrica className="text-5xl text-yellow-300 mx-auto mb-4"/>
            <h3 className="text-4xl font-bold">30+</h3>
            <p>Programs</p>
          </div>

        </div>

      </section>

    //   //////////////////////////school cards\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    <section className="py-20 bg-gradient-to-br from-white via-blue-50 to-indigo-50">
    
            <div className="container mx-auto px-6">
    
              <h2 className="text-4xl font-bold text-center mb-14">
                Explore Our Schools
              </h2>
    
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
    
                {schools.map((school) => (
    
                  <Tilt key={school.id} scale={1.05}>
    
                    <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition">
    
                      <div className={`bg-gradient-to-r ${school.gradient} p-6 text-white`}>
                        <div className="text-3xl mb-2">{school.icon}</div>
                        <h3 className="font-bold text-lg">
                          School of {school.name}
                        </h3>
                      </div>
    
                      <div className="p-6 bg-white">
    
                        <p className="text-gray-600 text-sm mb-4">
                          {school.description}
                        </p>
    
                        <Link
                          to={school.path}
                          className="text-blue-600 font-semibold flex items-center"
                        >
                          Explore <FaArrowRight className="ml-2"/>
                        </Link>
    
                      </div>
    
                    </div>
    
                  </Tilt>
    
                ))}
    
              </div>
    
            </div>
    
          </section>
    