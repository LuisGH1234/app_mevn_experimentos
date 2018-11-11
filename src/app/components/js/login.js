const User = require('../../models/User');

export default {
    data() {
        return {
            user: new User(),
            incorrectLogin: false
        }
    },
    methods: {
        sigin() {
            fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify(this.user),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                if (data.access == 'True') {
                    this.incorrectLogin = false;
                    window.location.href = `/playlists`;
                } else {
                    this.incorrectLogin = true;
                }
            })
            .catch(err => console.log(err));
        }
    }
}