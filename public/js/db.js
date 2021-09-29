const dbPromised = idb.open("soccer", 1, function (upgradeDb) {
    const articlesObjectStore = upgradeDb.createObjectStore("teams", {
        keyPath: "id"
    });
    articlesObjectStore.createIndex("nama", "nama", {
        unique: false
    });
});

const saveForLater = data => {
    dbPromised.then(db => {
            const tx = db.transaction("teams", "readwrite");
            tx.objectStore("teams").put(data);
            return tx.complete;
        })
        .then(() => {
            console.log('Artikel berhasil di simpan');
            M.toast({
                html: 'Halaman telah disimpan'
            })
        })
}

const getAll = () => {
    return new Promise((resolve, reject) => {
        dbPromised.then(db => {
                const tx = db.transaction("teams", "readonly");
                return tx.objectStore("teams").getAll();
            })
            .then(data => {
                resolve(data);
            })
    })
}

const getById = id => {
    return new Promise((resolve, reject) => {
        dbPromised.then(db => {
                const tx = db.transaction("teams", "readonly");
                return tx.objectStore("teams").get(id);
            })
            .then(data => {
                resolve(data)
            })
    })
}

const deleteTeams = id => {
    return new Promise((resolve, reject) => {
        dbPromised.then(db => {
            const tx = db.transaction("teams", `readwrite`);
            tx.objectStore("teams").delete(id);
            return tx.complete;
        }).then(() => {
            M.toast({
                html: 'Halaman sudah dihapus'
            })
            resolve(true)
        })
    })
};