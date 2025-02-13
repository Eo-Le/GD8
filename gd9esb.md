---
title: GD9Esb Fødselsdag
---
<h1><u>Upcoming events</u></h1>
<div class="p-2 mb-5 border border-2 rounded" id="containerForUpcomingEvents">
	<p>Hvis du ser denne tekst, er Upcoming events ikke loadet korrekt!</p>
</div>

<h1><u>Alle familierne</u></h1>
<div class="container-fluid d-flex align-items-center text-center overflow-x-auto overflow-y-hidden mb-5 border border-2 rounded custom-img-container">
    {% assign sorted_people = site.data.persons.gd9esb.all | sort: "dob" %}
    {% for person in sorted_people %}
        {% if person.dob and person.dob.size == 10 %}
            <div class="p-2 mx-2 border border-2 rounded" style="background-color: #333">
                <img class="rounded-circle" src="{{ person.img }}" alt="{{ person.name }}">
                <p class="pt-2"><small>{{ person.name }}<br>{{ person.dob | date: '%d-%m-%Y' }}</small></p>
            </div>
        {% endif %}
    {% endfor %}
</div>

<h1><u>Alle</u></h1>
<div class="p-2 mb-5 border border-2 rounded" id="containerBornInJan">
	<p>Hvis du ser denne tekst, er indholdet ikke loadet korrekt!</p>
</div>



<script src="{{ '/assets/js/update-check.js' | relative_url }}"></script>
<script src="{{ '/assets/js/calc-upcoming-events.js' | relative_url }}"></script>
<script src="{{ '/assets/js/calc-birthday-persons.js' | relative_url }}"></script>
<script src="{{ '/assets/js/calc-upcoming-birthdays.js' | relative_url }}"></script>
<script src="{{ '/assets/js/calc-birthdays-passed.js' | relative_url }}"></script>
<script src="{{ '/assets/js/calc-ppl-by-month.js' | relative_url }}"></script>
<script src="{{ '/assets/js/calc-ppl-by-family.js' | relative_url }}"></script>
<script src="{{ '/assets/js/calc-ppl-all.js' | relative_url }}"></script>

<script>
    var gd9esb_all = {{ site.data.persons.gd9esb["all"] | jsonify }};
    calcPeopleAll(gd9esb_all,'containerBornInJan');
</script>