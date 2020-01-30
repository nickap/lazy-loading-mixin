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
            }
        }
    },
    destroyed: function () {
        observer.disconnect();
    }

}