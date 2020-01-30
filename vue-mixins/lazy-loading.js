var lazyLoading = {
    data: function () {
        return {
            intersectionObserver: {
                enabled: ('IntersectionObserver' in window) ? true : false,
                target: '.lazy-img'
            }
        }
    },
    methods: {
        setUpObserver: function () {
            if (this.intersectionObserver.enabled) {
                observer = new IntersectionObserver((entries) => {
                    console.log(entries);
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.src = entry.target.dataset.src;
                            observer.unobserve(entry.target);
                        }
                    })
                });

                document.querySelectorAll(this.intersectionObserver.target).forEach(image => {
                    observer.observe(image);

                });
            } else {
                /* Load everything if 'IntersectionObserver' in Window == false */
                console.log("IntersectionObserver NOT found in Window.");
                document.querySelectorAll(this.intersectionObserver.target).forEach(image => {
                    image.src = image.dataset.src;
                });
            }
        }
    },
    destroyed: function () {
        observer.disconnect();
    }

}