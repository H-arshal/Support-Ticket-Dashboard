package com.ticketmanager.backend.config;

import com.ticketmanager.backend.entity.Ticket;
import com.ticketmanager.backend.enums.Priority;
import com.ticketmanager.backend.enums.Status;
import com.ticketmanager.backend.repository.TicketRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    private final TicketRepository ticketRepository;

    public DatabaseSeeder(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (ticketRepository.count() == 0) {
            List<Ticket> tickets = new ArrayList<>();
            LocalDateTime now = LocalDateTime.now();
            
            String[][] rawData = {
                {"Unable to sign in after password change", "I changed my password this morning and was able to sign in once. Since then, every login attempt returns \"Invalid credentials\". I have also tried resetting the password again but the issue is still happening.", "priya.sharma@northstaranalytics.com", "HIGH", "OPEN"},
                {"Password reset email delayed", "I requested a password reset about 30 minutes ago but nothing has arrived in my inbox. I checked spam and promotions as well. Could you please check whether the reset email was sent?", "daniel.ross@brightpath.io", "HIGH", "IN_PROGRESS"},
                {"Update billing address", "We recently moved offices and need to update the billing address that appears on our invoices. I checked the billing section but could not find an option to edit it.", "megan.wright@acmecloud.co", "LOW", "RESOLVED"},
                {"Mobile app crashes on launch", "The app closes immediately after the splash screen on an iPhone running iOS 17.4. I have reinstalled the app twice and restarted the phone, but the issue persists.", "alex.martin@redwoodlabs.com", "HIGH", "OPEN"},
                {"Request for dark mode", "Our team spends quite a bit of time in the dashboard during evening shifts. Is dark mode planned for a future release?", "rohan.patel@vertexsystems.io", "LOW", "OPEN"},
                {"Incorrect wording on pricing page", "There appears to be a typo in the description of the Enterprise plan. It says \"unlimted projects\" instead of \"unlimited projects\".", "sarah.chen@orbitworks.com", "LOW", "RESOLVED"},
                {"Report download fails with CORS error", "The monthly usage report is generated correctly, but clicking Download does not start the download. The browser console shows a CORS error from the reports endpoint.", "marcus.johnson@finora.com", "MEDIUM", "IN_PROGRESS"},
                {"Account locked after failed login attempts", "My account was locked after several failed login attempts. I believe someone may have entered the wrong password multiple times. Please help me regain access.", "emma.wilson@cloudforge.dev", "HIGH", "RESOLVED"},
                {"API rate limit clarification", "We are integrating the users endpoint into an internal service and need to understand the current rate limits. Is the limit different for authenticated and unauthenticated requests?", "kevin.lee@datawise.io", "MEDIUM", "RESOLVED"},
                {"Duplicate charge on subscription", "Our company card was charged twice for the same monthly subscription on September 28. Both transactions have the same amount and appear to have been processed successfully.", "olivia.bennett@horizonapps.com", "HIGH", "OPEN"},
                {"Dashboard takes too long to load", "The dashboard has become noticeably slower over the last few days. It takes around 10 to 15 seconds before all widgets finish loading, especially the activity and usage sections.", "aarav.mehta@pixelgrid.io", "MEDIUM", "IN_PROGRESS"},
                {"Request to add PayPal support", "We currently use PayPal for several of our SaaS subscriptions. Are there plans to add PayPal as a supported payment method?", "james.turner@bluepeak.co", "LOW", "OPEN"},
                {"Invite user option unavailable", "I am an organization administrator, but the Invite User button is disabled. This started happening today and I have not changed any organization settings.", "natalie.cooper@silverline.tech", "HIGH", "IN_PROGRESS"},
                {"Slack notification integration setup", "We would like to send ticket and deployment notifications to a Slack channel. Could you provide the setup steps or let us know if an administrator needs to enable the integration first?", "william.harris@cloudnest.io", "MEDIUM", "RESOLVED"},
                {"CSV export contains no records", "The export completes successfully and downloads a CSV file, but the file is empty. I selected the full month of September and there should be several hundred records.", "ananya.iyer@quantumdesk.com", "HIGH", "OPEN"},
                {"Unable to save profile changes", "I am trying to update my phone number in the profile settings. The form keeps saying the phone number is invalid, although the number is in the correct format and works elsewhere.", "ethan.brooks@novacore.io", "MEDIUM", "OPEN"},
                {"Subscription renewal link returns 404", "The renewal reminder email contains a link that takes me to a 404 page. The subscription is due to renew this week, so I would like to resolve this before the renewal date.", "sophia.miller@atlascommerce.com", "HIGH", "IN_PROGRESS"},
                {"Delete test project", "I created a test project while evaluating the platform and now want to remove it. I can archive the project but cannot find an option to permanently delete it.", "noah.anderson@devbridge.io", "LOW", "RESOLVED"},
                {"2FA verification code not received", "I am not receiving the SMS verification code when trying to sign in. I have requested the code multiple times and confirmed that my phone number is correct in the account settings.", "isha.kapoor@matrixlabs.in", "HIGH", "OPEN"},
                {"Company name incorrect on invoice", "Our legal company name changed recently and the latest invoice still shows the previous name. Could you let me know what information you need from us to update the billing details?", "lucas.evans@meridianworks.com", "MEDIUM", "RESOLVED"},
                {"Webhook requests timing out", "Our webhook deliveries have started timing out intermittently since approximately 09:30 UTC. We are seeing multiple retries from your service, and some events are now arriving several minutes late.", "benjamin.carter@payflow.dev", "HIGH", "IN_PROGRESS"},
                {"Navigation menu overlaps on mobile", "The navigation menu overlaps the page content when the dashboard is opened on a smaller screen. I reproduced the issue on Chrome and Safari on an iPhone.", "grace.thompson@lumenapps.io", "LOW", "OPEN"},
                {"Custom domain verification pending", "We added the DNS records provided in the documentation for our custom domain, but the domain is still showing as pending verification after several hours.", "ryan.mitchell@evergreencloud.com", "MEDIUM", "RESOLVED"},
                {"Storage usage approaching plan limit", "Our workspace is currently at around 92% of the included storage. We would like to increase the storage limit without moving to a different plan if that is possible.", "neha.verma@stackwise.io", "MEDIUM", "IN_PROGRESS"},
                {"January and February invoices missing", "I can see our recent invoices in the billing section, but the invoices for January and February 2026 are missing. We need copies of both for our accounting records.", "charlotte.adams@oakridgegroup.com", "MEDIUM", "OPEN"},
                {"Request to export reports as PDF", "Our finance team currently downloads the CSV reports and converts them manually before sharing them. A PDF export option would make the reporting workflow much easier.", "aditya.desai@finstack.in", "LOW", "OPEN"},
                {"User search returns no results", "Searching for an existing user by their ID returns \"No users found\". I can locate the same user when browsing the organization manually. This appears to affect only ID-based searches.", "henry.walker@brightline.dev", "HIGH", "IN_PROGRESS"},
                {"Email notifications stopped arriving", "I have stopped receiving ticket notification emails since yesterday afternoon. Other emails are reaching my inbox normally, so this appears to be specific to the application.", "laura.morgan@clearview.io", "MEDIUM", "OPEN"},
                {"Unable to change workspace timezone", "Our workspace is currently showing activity timestamps in the wrong timezone. I tried changing the workspace timezone in settings, but the new value is not being saved.", "vikram.singh@blueorbit.in", "MEDIUM", "IN_PROGRESS"},
                {"Unexpected logout from dashboard", "Several members of our team were logged out of the dashboard at approximately the same time today. We were all actively using the application when this happened.", "michael.foster@greystone.com", "HIGH", "RESOLVED"},
                {"Incorrect user role displayed", "I changed a team member from Viewer to Editor yesterday, but their account is still showing the Viewer role after signing out and signing back in.", "julia.reed@northwave.tech", "HIGH", "OPEN"},
                {"Unable to upload company logo", "The company logo upload reaches 100 percent but then displays an unknown error. We tried both PNG and JPG files under the recommended size limit.", "oliver.hughes@marketlane.co", "LOW", "RESOLVED"},
                {"Search becomes unresponsive", "The global search field stops responding after entering a few characters. Refreshing the page temporarily fixes it, but the problem comes back after another search.", "meera.nair@cloudaxis.io", "MEDIUM", "IN_PROGRESS"},
                {"Invoice payment failed unexpectedly", "Our latest invoice payment failed even though the card is active and has sufficient funds. The same card was used successfully for the previous two invoices.", "chris.watson@redwoodfinance.com", "HIGH", "OPEN"},
                {"Unable to remove team member", "I am trying to remove a former employee from our workspace. The confirmation dialog appears, but clicking Remove does not make any changes.", "danielle.king@brightworks.io", "MEDIUM", "OPEN"},
                {"API authentication token rejected", "Requests that worked yesterday are now returning 401 responses. We generated a new API token and updated our service configuration, but the requests are still being rejected.", "samuel.green@integralabs.dev", "HIGH", "IN_PROGRESS"},
                {"Activity log missing recent events", "The activity log does not show actions performed by our administrators today. Older events are visible, but nothing from the last several hours appears in the list.", "fatima.khan@vertexlabs.in", "HIGH", "OPEN"},
                {"Cannot change notification preferences", "The notification settings page loads correctly, but the changes are not persisted after clicking Save. Every time I return to the page, the previous settings are restored.", "george.wilson@oaklabs.com", "MEDIUM", "RESOLVED"},
                {"Browser session expires too quickly", "Users on our internal network are being asked to sign in again every 20 to 30 minutes. This started after the latest dashboard update.", "harper.clark@silveroak.io", "MEDIUM", "IN_PROGRESS"},
                {"Report shows incorrect date range", "When I select September 1 through September 30, the generated report includes transactions from October 1 as well. The same issue occurs with several other date ranges.", "rohit.joshi@finwise.in", "HIGH", "OPEN"},
                {"Unable to connect Google account", "I am trying to connect my Google account for calendar synchronization. The authorization page completes successfully, but the application shows \"Connection failed\" afterward.", "amelia.brown@taskflow.dev", "MEDIUM", "OPEN"},
                {"Dashboard widgets not refreshing", "The dashboard loads correctly but the metrics remain unchanged throughout the day. Manually refreshing the browser updates the numbers.", "matthew.young@insightworks.com", "MEDIUM", "IN_PROGRESS"},
                {"Request for additional team seats", "We need to add approximately 15 more users to our workspace next month. Could you explain how additional seats are billed and whether the plan needs to be upgraded?", "kavya.reddy@brightstack.io", "LOW", "RESOLVED"},
                {"CSV export formatting issue", "The exported CSV contains the correct records, but several fields containing commas are not being escaped correctly. This causes the columns to shift when we open the file in Excel.", "peter.scott@dataharbor.com", "MEDIUM", "OPEN"},
                {"Webhook secret rotation", "We need to rotate the signing secret for our production webhook endpoint. Is there a way to generate a new secret without disabling the existing endpoint?", "sneha.patel@paybridge.in", "LOW", "RESOLVED"},
                {"Team invitation email not received", "I invited two new team members this morning. The invitations show as pending in the dashboard, but neither person has received an email yet.", "andrew.baker@cloudpeak.io", "MEDIUM", "IN_PROGRESS"},
                {"File upload fails for larger files", "Small attachments upload without any issues, but files larger than approximately 25 MB consistently fail near the end of the upload.", "claire.hall@mediaforge.com", "HIGH", "OPEN"},
                {"Incorrect currency displayed", "Our billing currency is configured as EUR, but the subscription page is displaying prices in USD. The invoices still appear to use EUR.", "antoine.martin@eurobyte.eu", "MEDIUM", "RESOLVED"},
                {"SSO login redirects back to sign-in", "Our SAML configuration appears to be accepted, but after authentication the browser redirects back to the normal sign-in page instead of opening the workspace.", "robert.wilson@enterprisehub.com", "HIGH", "IN_PROGRESS"},
                {"Scheduled report was not delivered", "The weekly report is configured to be delivered every Monday morning, but this weeks email was not received. The schedule is still enabled in the dashboard.", "nisha.shah@analyticspro.in", "MEDIUM", "OPEN"},
                {"Unable to duplicate project", "The Duplicate Project option is visible in the project menu, but clicking it does not create a copy. There is no error message shown to the user.", "tom.harris@devsphere.io", "LOW", "OPEN"},
                {"Slow API response times", "We are seeing significantly higher response times from the API during the last two hours. Requests that normally complete in under 500 ms are taking between 3 and 5 seconds.", "yuki.tanaka@globalmesh.jp", "HIGH", "IN_PROGRESS"},
                {"Two users receiving the same notification", "Two administrators are receiving duplicate notifications for the same ticket update. This started after we added a second notification rule.", "carter.lewis@supportgrid.com", "LOW", "RESOLVED"},
                {"Project permissions not applying", "I removed a user from a project yesterday, but they can still access the project through a previously saved link. Their access should have been revoked.", "isabelle.morris@securepath.io", "HIGH", "OPEN"},
                {"Billing page shows outdated plan", "We upgraded our workspace from the Starter plan to Business yesterday. The payment was successful, but the billing page still displays the old plan.", "rahul.kulkarni@technova.in", "MEDIUM", "IN_PROGRESS"},
                {"Unable to download audit logs", "The audit log page loads all events correctly, but the Download CSV button does not respond. Other exports from the account work normally.", "victoria.turner@complianceworks.com", "HIGH", "RESOLVED"},
                {"Invitation link has expired", "A team member received an invitation several days ago but did not accept it in time. The invitation link now shows as expired. Can we resend the invitation?", "louis.parker@blueharbor.dev", "LOW", "RESOLVED"},
                {"Unexpected error when creating project", "Creating a new project fails with a generic \"Something went wrong\" message. Existing projects can still be opened and edited normally.", "sanjay.rao@orbitstack.in", "HIGH", "OPEN"},
                {"Mobile notifications delayed", "Push notifications on Android are arriving several minutes after the corresponding ticket update. Notifications are immediate when the application is open.", "emma.cole@workflowlabs.com", "MEDIUM", "IN_PROGRESS"},
                {"Need clarification on data retention", "Our compliance team needs to understand how long deleted project data and audit logs are retained before permanent removal. Could you point us to the relevant retention policy?", "martin.berger@europoint.de", "LOW", "RESOLVED"}
            };

            for (int i = 0; i < rawData.length; i++) {
                String[] row = rawData[i];
                Ticket ticket = new Ticket();
                ticket.setTitle(row[0]);
                ticket.setDescription(row[1]);
                ticket.setCustomerEmail(row[2]);
                ticket.setPriority(Priority.valueOf(row[3]));
                ticket.setStatus(Status.valueOf(row[4]));
                ticket.setTicketNumber((long) (i + 1));
                
                // Keep timestamps realistic like before
                ticket.setCreatedAt(now.minusDays(i % 10));
                ticket.setUpdatedAt(now.minusDays(i % 10));
                
                tickets.add(ticket);
            }

            ticketRepository.saveAll(tickets);
            System.out.println("✅ Database seeded with 60 REAL user tickets into MongoDB Atlas!");
        }
    }
}
