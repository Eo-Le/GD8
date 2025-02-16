---
title: GD9Esb Fødselsdag
---
<h1><u>Upcoming events</u></h1>
<div class="p-2 mb-5 border border-2 rounded" id="containerForUpcomingEvents">
	<p>Hvis du ser denne tekst, er Upcoming events ikke loadet korrekt!</p>
</div>


<h1><u>Alle familierne</u></h1>
<div class="p-2 mb-5 border border-2 rounded" id="containerForGD9EsbAll">
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
    var gd9esb = {{ site.data.persons.gd9esb["all"] | jsonify }};
    calcPeopleAll(gd9esb,'containerForGD9EsbAll');
</script>