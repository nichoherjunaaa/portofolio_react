import './Home.css';
import React, { useEffect, useRef } from 'react';

const Home = () => {
    const elementRef = useRef(null); // Menggunakan ref untuk mengakses elemen DOM

    const fullText = 'Nicho Herjuna'; // Teks yang ingin ditampilkan
    const period = 2000; // Interval antara penggantian teks

    class TxtType {
        constructor(el, text, period) {
            this.text = text;
            this.el = el;
            this.period = parseInt(period, 10) || 2000;
            this.txt = '';
            this.isDeleting = false;
            this.tick();
        }

        tick() {
            const fullTxt = this.text;

            // Menentukan teks yang ditampilkan
            this.txt = this.isDeleting ? 
                fullTxt.substring(0, this.txt.length - 1) : 
                fullTxt.substring(0, this.txt.length + 1);

            this.el.innerHTML = `<span class="wrap" style="color: #ff0000; font-weight: bold; font-size: 48px">${this.txt}</span>`;

            // Mengatur kecepatan pengetikan
            let delta = this.isDeleting ? 100 : 200; // Lebih cepat saat menghapus

            // Logika untuk beralih antara pengetikan dan penghapusan
            if (!this.isDeleting && this.txt === fullTxt) {
                delta = this.period; // Tunggu selama periode sebelum mulai menghapus
                this.isDeleting = true; // Mulai menghapus
            } else if (this.isDeleting && this.txt === '') {
                this.isDeleting = false; // Mulai mengetik lagi
                delta = 500; // Tunggu sebelum mulai mengetik
            }

            // Gunakan requestAnimationFrame untuk animasi yang lebih halus
            setTimeout(() => this.tick(), delta); 
        }
    }

    useEffect(() => {
        const element = elementRef.current; // Dapatkan elemen DOM
        if (element) {
            new TxtType(element, fullText, period); // Mulai animasi
        }

        // Inject CSS untuk border
        const css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typing > .wrap { border-right: 0.08em solid #fff; }";
        document.body.appendChild(css);

        return () => {
            document.body.removeChild(css); // Bersihkan saat komponen di-unmount
        };
    }, []); // Jalankan sekali saat komponen dimuat

    return (
        <>
            <div className="navbar">
                <div className="logo">
                    <i className="fas fa-circle"></i>
                    <span>
                        informa<span className="primary">tics.</span>
                    </span>
                </div>
                <div className="menu">
                    <a className="active" href="#">
                        Home
                    </a>
                    <a href="#">
                        About
                    </a>
                    <a href="#">
                        Education
                    </a>
                    <a href="#">
                        Skills
                    </a>
                    <a href="#">
                        Projects
                    </a>
                </div>
                <a className="contact-btn" href="#">
                    Contact
                </a>
            </div>
            <div className="hero">
                <div className="text">
                    <h1>
                        I'm <span className="typing" ref={elementRef}></span>
                        <br />
                        <span className="role">Informatics Engineering Student</span>
                    </h1>
                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed perferendis corrupti mollitia, deserunt itaque incidunt quisquam rerum suscipit explicabo facere fugit, non quibusdam, natus officiis pariatur qui dolorum? Nisi quas, accusantium provident ducimus rem consequuntur dolore, esse eveniet amet, a rerum praesentium officia. Ab minus mollitia rerum beatae, perspiciatis nostrum.
                    </p>
                    <div className="buttons">
                        <a className="contact" href="#">
                            Hire me
                        </a>
                        <a className="portfolio" href="#">
                            Download CV
                        </a>
                    </div>
                </div>
                <div className="image">
                    <img src="/images.jpg" alt="Deskripsi Gambar" />
                </div>
            </div>
        </>
    );
}

export default Home;