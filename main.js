// Wczytaj dane z plików JSON i wyświetl je na stronie
document.addEventListener("DOMContentLoaded", function () {
    Promise.all([
        fetch('data/league_data.json').then(res => res.json()),
        fetch('data/schedule_data.json').then(res => res.json())
    ])
    .then(([leagueData, scheduleData]) => {
        showLeagueTable(leagueData);
        showSchedule(scheduleData);
    })
    .catch(error => {
        console.error("Błąd wczytywania danych:", error);
    });
});

function showLeagueTable(data) {
    const tableBody = document.querySelector("table tbody");
    tableBody.innerHTML = "";

    const sortedTeams = Object.entries(data).sort((a, b) => {
        const [teamA, statsA] = a;
        const [teamB, statsB] = b;
        return (
            statsB.Punkty - statsA.Punkty ||
            statsB.Bilans - statsA.Bilans ||
            statsB["Bramki zdobyte"] - statsA["Bramki zdobyte"]
        );
    });

    sortedTeams.forEach(([team, stats], i) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${i + 1}</td>
            <td>${team}</td>
            <td>${stats["Mecze"]}</td>
            <td>${stats["Punkty"]}</td>
            <td>${stats["Zwycięstwa"]}</td>
            <td>${stats["Remisy"]}</td>
            <td>${stats["Porażki"]}</td>
            <td>${stats["Bramki zdobyte"]}</td>
            <td>${stats["Bramki stracone"]}</td>
            <td>${stats["Bilans"]}</td>
        `;
        tableBody.appendChild(row);
    });
}

function showSchedule(schedule) {
    const scheduleContainer = document.querySelector(".section");
    const table = document.createElement("table");

    if (schedule.length === 0) {
        scheduleContainer.innerHTML += `<p>Brak rozegranych meczów.</p>`;
        return;
    }

    table.innerHTML = `
        <tr>
            <th>Gospodarz</th>
            <th>Gość</th>
            <th>Wynik</th>
        </tr>
    `;

    schedule.forEach(match => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${match.Gospodarz}</td>
            <td>${match.Gość}</td>
            <td>${match.Wynik}</td>
        `;
        table.appendChild(row);
    });

    scheduleContainer.appendChild(table);
}
