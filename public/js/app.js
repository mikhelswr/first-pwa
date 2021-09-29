const base_url = `https://api.football-data.org/v2/`;
const API_KEY = `7510df6cf8c54a6999d78df06edadad1`;


const status = response => {
    if (response.status !== 200) {
        console.log(`Error : ${response.status}`);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

const json = response => {
    return response.json();
}

const error = error => {
    console.log(`Error : ${error}`);
}

const fetchUrl = (url) => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': API_KEY
        }
    });
};

// ==================================================================================

const getStandings = () => {
    if ('caches' in window) {
        caches.match(`${base_url}competitions/PL/teams`, {
            headers: {
                'X-Auth-Token': API_KEY
            }
        }).then(response => {
            if (response) {
                response.json().then(data => {
                    let teamHTML = ``;
                    data.teams.forEach(stand => {
                        teamHTML += `
                            <a href="./more.html?id=${stand.id}">
                            <div class="col s12 m6 l4">
                            <div class="card horizontal hoverable valign-wrapper" style="height: 150px">
                            <div class="card-image" style="width: 125px;height: 125px; padding: 10px;">
                            <img src="${stand.crestUrl}" style="height: 100%;">
                            </div>
                            <div class="card-stacked">
                            <div class="card-content">
                            <h5 stytle="margin: 20px;">${stand.name}</h5>
                            </div>
                            </div>
                            </div>
                            </div>
                            </a>
                        `;
                    });
                    document.getElementById('data').innerHTML = teamHTML;
                })
            }
        })
    }

    fetchUrl(`${base_url}competitions/PL/teams`)
        .then(status)
        .then(json)
        .then(data => {
            let teamHTML = ``;
            data.teams.forEach(stand => {
                teamHTML += `
                    <a href="./more.html?id=${stand.id}">
                    <div class="col s12 m6 l4">
                    <div class="card horizontal hoverable valign-wrapper" style="height: 150px">
                    <div class="card-image" style="width: 125px;height: 125px; padding: 10px;">
                    <img src="${stand.crestUrl}" style="height: 100%;">
                    </div>
                    <div class="card-stacked">
                    <div class="card-content">
                    <h5 stytle="margin: 20px;">${stand.name}</h5>
                    </div>
                    </div>
                    </div>
                    </div>
                    </a>
                `;
            });
            document.getElementById('data').innerHTML = teamHTML;

            if (document.getElementById('data').innerHTML = teamHTML) {
                document.getElementById('load').style.display = 'none';
            }
        })
}

// ==================================================================================

const getTeamById = () => {
    return new Promise((resolve, reject) => {
        const urlParams = new URLSearchParams(window.location.search);
        const idParam = urlParams.get("id");

        if ('caches' in window) {
            caches.match(`${base_url}teams/${idParam}`, {
                    headers: {
                        'X-Auth-Token': API_KEY
                    }
                })
                .then(response => {
                    if (response) {
                        response.json().then(data => {
                            let headTeam = `
                                <h3>${data.name}</h3>
                                <img class="responsive-img" src="${data.crestUrl}" alt="">
                        `;
                            let contactTeam = `
                                <h4>Contact</h4>
                                <p>${data.address}</p>
                                <p>${data.phone}</p>
                                <a href="${data.website}">${data.website}</a>
                        `;
                            let squadTeam = ``;
                            data.squad.forEach(squad => {
                                squadTeam += `
                                <tr>
                                <td>${squad.name}</td>
                                <td>${squad.countryOfBirth}</td>
                                <td>${squad.nationality}</td>
                                <td>${squad.position}</td>
                                </tr>
                            `
                            });
                            document.getElementById('head').innerHTML = headTeam;
                            document.getElementById('squad').innerHTML = squadTeam;
                            document.getElementById('contact').innerHTML = contactTeam;
                            resolve(data);
                        })
                    }
                })
        }


        fetchUrl(`${base_url}teams/${idParam}`)
            .then(status)
            .then(json)
            .then(data => {
                console.log(data);
                let headTeam = `
                    <h3>${data.name}</h3>
                    <img class="responsive-img" src="${data.crestUrl}" alt="${data.shortName}">
                `;
                let contactTeam = `
                    <h4>Contact</h4>
                    <p>${data.address}</p>
                    <p>${data.phone}</p>
                    <a href="${data.website}">${data.website}</a>
                `;
                let squadTeam = ``;
                data.squad.forEach(squad => {
                    squadTeam += `
                    <tr>
                    <td>${squad.name}</td>
                    <td>${squad.countryOfBirth}</td>
                    <td>${squad.nationality}</td>
                    <td>${squad.position}</td>
                    </tr>
                    `
                });
                document.getElementById('head').innerHTML = headTeam;
                document.getElementById('squad').innerHTML = squadTeam;
                document.getElementById('contact').innerHTML = contactTeam;
                resolve(data);
            })
    })
}

// ==================================================================================

const getMatch = () => {
    if ('caches' in window) {
        caches.match(`${base_url}competitions/PL/matches?status=FINISHED&matchday=29`, {
                headers: {
                    'X-Auth-Token': API_KEY
                }
            })
            .then(response => {
                if (response) {
                    response.json().then(data => {
                        let cardMatch = ``;
                        data.matches.forEach(match => {
                            cardMatch += `
                            <div class="card">
                            <table class="centered">
                            <tr>
                            <td>${match.awayTeam.name}</td>
                            <td rowspan="2">:</td>
                            <td>${match.homeTeam.name}</td>
                            </tr>
                            <tr>
                            <td>${match.score.fullTime.awayTeam}</td>
                            <td>${match.score.fullTime.homeTeam}</td>
                            </tr>
                            </table>
                            </div>
                        `;
                        });
                        document.getElementById('match').innerHTML = cardMatch;
                    })
                }
            })
    }

    fetchUrl(`${base_url}competitions/PL/matches?status=FINISHED&matchday=29`)
        .then(status)
        .then(json)
        .then(data => {
            // console.log(data);
            let cardMatch = ``;
            data.matches.forEach(match => {
                cardMatch += `
                    <div class="card">
                    <table class="centered">
                    <tr>
                    <td>${match.awayTeam.name}</td>
                    <td rowspan="2">:</td>
                    <td>${match.homeTeam.name}</td>
                    </tr>
                    <tr>
                    <td>${match.score.fullTime.awayTeam}</td>
                    <td>${match.score.fullTime.homeTeam}</td>
                    </tr>
                    </table>
                    </div>
                `;
            });
            document.getElementById('match').innerHTML = cardMatch;

            if (document.getElementById('match').innerHTML = cardMatch) {
                document.getElementById('load').style.display = 'none';
            }
        });
}

// ==================================================================================

const getSavedTeamById = () => {
    const urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");
    idParam = parseInt(idParam);

    getById(idParam).then(team => {
            console.log(team);
            let headTeam = `
        <h3>${team.name}</h3>
        <img class="responsive-img" src="${team.crestUrl}" alt="${team.shortName}">
    `;
            let contactTeam = `
        <h4>Contact</h4>
        <p>${team.address}</p>
        <p>${team.phone}</p>
        <a href="${team.website}">${team.website}</a>
    `;
            let squadTeam = ``;
            team.squad.forEach(squad => {
                squadTeam += `
        <tr>
        <td>${squad.name}</td>
        <td>${squad.countryOfBirth}</td>
        <td>${squad.nationality}</td>
        <td>${squad.position}</td>
        </tr>
        `
            });
            document.getElementById('head').innerHTML = headTeam;
            document.getElementById('squad').innerHTML = squadTeam;
            document.getElementById('contact').innerHTML = contactTeam;
        })
        .catch(err => {
            console.log(err);
        })
}

// ==================================================================================

const getSavedTeams = () => {
    getAll().then(teams => {
        console.log(typeof (teams))
        let savedTeam = ``;

        if (teams == 0) {
            savedTeam += `
                <div class="col s12 m12 l12 center-align" style="margin-top: 30px;">
                <div class="card horizontal red-text">
                <div class="card-stacked">
                <div class="card-content">
                <p>Tidak ada data yang disimpan</p>
                </div>
                </div>
                </div>
                </div>
            `;
        } else {
            teams.forEach(saved => {
                savedTeam += `
                    <div class="col s12 m6 l4" style="margin-bottom:20px;">
                    <a href="./more.html?id=${saved.id}&saved=true">
                    <div class="card horizontal valign-wrapper z-depth-1" style="height: 150px">
                    <div class="card-image" style="width: 125px;height: 125px; padding: 10px;">
                    <img src="${saved.crestUrl}" style="height: 100%;">
                    </div>
                    <div class="card-stacked">
                    <div class="card-content">
                    <h5 stytle="margin: 20px;">${saved.name}</h5>
                    </div>
                    </div>
                    </div>
                    </a>
                    <a class="waves-effect waves-light btn-small red darken-4 delete" id="${saved.id}">Hapus</a>
                    </div>
                `;
            });
        }

        document.getElementById('teams').innerHTML = savedTeam;

        let hapus = document.querySelectorAll(".delete");
        hapus.forEach(e => {
            e.addEventListener('click', el => {
                let teamId = parseInt(el.target.id);
                // console.log(typeof (teamId));
                deleteTeams(teamId).then(() => {
                    getSavedTeams();
                })
            })
        });
    })
}

// ==================================================================================