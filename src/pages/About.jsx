import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="bg-white rounded-xl shadow-md p-8 mb-10">
        <h1 className="font-pixel text-3xl mb-6 text-primary-700 text-center">
          Tentang Science Quest
        </h1>
        
        <div className="max-w-3xl mx-auto">
          <p className="mb-4">
            Science Quest adalah platform permainan digital yang dirancang khusus untuk membantu siswa sekolah dasar dalam memahami konsep-konsep sains dan matematika dengan cara yang interaktif dan menyenangkan.
          </p>
          
          <p className="mb-4">
            Permainan ini bertujuan untuk mengatasi tantangan yang dihadapi oleh siswa dalam proses pembelajaran sains dan matematika, dengan mengintegrasikan elemen edukasi dan hiburan.
          </p>
          
          <h2 className="font-pixel text-xl mb-3 mt-6 text-primary-600">
            Latar Belakang
          </h2>
          <p className="mb-4">
            Permainan ini dirancang sebagai respons terhadap tantangan yang dihadapi oleh siswa sekolah dasar dalam memahami konsep sains dan matematika. Dengan meningkatnya kebutuhan untuk mengintegrasikan pembelajaran yang menyenangkan dan interaktif, permainan ini bertujuan untuk menciptakan lingkungan yang mendukung pembelajaran aktif.
          </p>
          
          <p className="mb-4">
            Melalui pendekatan gamifikasi, diharapkan siswa tidak hanya akan meningkatkan keterampilan sains dan matematika mereka, tetapi juga mengembangkan minat yang lebih besar terhadap mata pelajaran tersebut.
          </p>
          
          <h2 className="font-pixel text-xl mb-3 mt-6 text-primary-600">
            Konsep Permainan
          </h2>
          <p className="mb-4">
            Science Quest adalah sebuah platform permainan digital yang menggabungkan elemen edukasi dengan hiburan. Permainan ini dirancang untuk dapat diakses melalui perangkat mobile dan desktop, memungkinkan siswa untuk belajar di mana saja dan kapan saja.
          </p>
          
          <p className="mb-4">
            Dengan antarmuka yang ramah pengguna dan desain yang menarik, permainan ini bertujuan untuk menarik perhatian siswa dan mendorong mereka untuk berpartisipasi aktif dalam proses pembelajaran.
          </p>
          
          <h2 className="font-pixel text-xl mb-3 mt-6 text-primary-600">
            Masalah dan Solusi
          </h2>
          <p className="mb-4">
            <strong>Masalah:</strong> Banyak siswa mengalami kesulitan dalam memahami konsep sains dasar dan matematika, yang dapat mengakibatkan ketidakpercayaan diri dan minat yang rendah terhadap mata pelajaran tersebut.
          </p>
          
          <p className="mb-6">
            <strong>Solusi:</strong> Dengan menggunakan mekanisme permainan yang interaktif, Science Quest menawarkan tantangan yang dirancang untuk meningkatkan pemahaman sains dan matematika. Setiap level permainan memberikan umpan balik langsung, memungkinkan siswa untuk belajar dari kesalahan mereka dan memperbaiki keterampilan mereka secara bertahap. Selain itu, sistem penilaian dan penghargaan mendorong siswa untuk terus berusaha dan mencapai tujuan pembelajaran mereka.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;