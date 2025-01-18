"use server";

import mailchimp from "@mailchimp/mailchimp_marketing";

const API_KEY = process.env.MAILCHIMP_API_KEY;
const SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX;
const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;

mailchimp.setConfig({
    apiKey: API_KEY,
    server: SERVER_PREFIX,
});

// https://mailchimp.com/developer/marketing/api/list-members/add-member-to-list/
export async function addListMember(email_address: string) {
    if (!AUDIENCE_ID) {
        console.error("AUDIENCE ID NOT DEFINED");
        return;
    }

    const response = await mailchimp.lists.addListMember(AUDIENCE_ID, {
        email_address: email_address,
        status: "pending",
    });
    console.log(response);
}
