window.alert("Potential RSVP Form. For wedding planning!");

let applicants = [];

let rsvpForm = document.querySelector("#RSVPForm");

rsvpForm.addEventListener("submit", addApplicant);

function addApplicant(e) {
    e.preventDefault();

    let nameInput = document.querySelector("#name").value;
    let emailInput = document.querySelector("#email").value;
    let phoneInput = document.querySelector("input[name='phone']").value;
    let checkboxInput = document.querySelector("#plusone").checked;
    let commentsInput = document.querySelector("#comments").value;

    let resultsDiv = document.querySelector("#all-applicants");

    let errorMsg = "";
    if (!nameInput || !emailInput || !phoneInput) {
    errorMsg = "Woah slow down. We need a way to contact you!";
    } else if (nameInput.length < 3) {
    errorMsg = "No nicknames!";
    } else if (phoneInput.length < 7 || phoneInput.length > 12) {
    errorMsg = "Input your real number so we can call you!";
    }

    if (errorMsg) {
    resultsDiv.textContent = errorMsg;
    return;
    }

    let newApplicant = {
        name: nameInput,
        email: emailInput,
        phone: phoneInput,
        plusone: checkboxInput,
        comments: commentsInput
    };

    applicants.push(newApplicant);

    populateApplicantInfo();
    
    rsvpForm.reset();
}

function populateApplicantInfo() {
    let infoDiv = document.querySelector("section");
    infoDiv.innerHTML = "<h2>Thank you for your submission!</h2><p>We look forward to celebrating with you.</p>";

    for (let applicant of applicants) {
        let applicantHTML = createApplicantDiv(applicant);
        infoDiv.innerHTML += applicantHTML;
    }
}

function createApplicantDiv(applicant) {
    return `
        <div class="applicant">
            <h3>${applicant.name}</h3>
            <p>Email: ${applicant.email}</p>
            <p>Phone: ${applicant.phone}</p>
            <p>Plus one: ${applicant.plusone ? "Yes" : "No"}</p>
            <p>Comments: ${applicant.comments}</p>
        </div>
    `;
}
