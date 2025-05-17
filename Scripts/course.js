const courses = [
    { code: 'WDD 130', name: 'Web Fundamentals', credits: 3, type: 'WDD', completed: true },
    { code: 'CSE 110', name: 'Intro to Programming', credits: 2, type: 'CSE', completed: true },
    { code: 'WDD 131', name: 'Dynamic Web Fundamentals', credits: 3, type: 'WDD', completed: true },
    { code: 'CSE 111', name: 'Programming with Functions', credits: 2, type: 'CSE', completed: true },
    { code: 'WDD 231', name: 'Frontend Development II', credits: 3, type: 'WDD', completed: false },
    { code: 'CSE 210', name: 'Programming with Classes', credits: 2, type: 'CSE', completed: false }
  ];
  
  const coursesContainer = document.getElementById('courses');
  const totalCreditsSpan = document.getElementById('totalCredits');
  
  function renderCourses(filtered) {
    coursesContainer.innerHTML = '';
    let totalCredits = 0;
  
    filtered.forEach(course => {
      const card = document.createElement('div');
      card.classList.add('course-card');
      if (course.completed) card.classList.add('completed');
  
      card.innerHTML = `<strong>${course.code}</strong>: ${course.name} (${course.credits} credits)`;
      coursesContainer.appendChild(card);
  
      totalCredits += course.credits;
    });
  
    totalCreditsSpan.textContent = totalCredits;
  }
  
  renderCourses(courses);
  
  document.getElementById('all').addEventListener('click', () => renderCourses(courses));
  document.getElementById('wdd').addEventListener('click', () => renderCourses(courses.filter(c => c.type === 'WDD')));
  document.getElementById('cse').addEventListener('click', () => renderCourses(courses.filter(c => c.type === 'CSE')));
  