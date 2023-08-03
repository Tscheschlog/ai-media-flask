import subprocess

def append_to_crontab(new_cron_job, comment):
    try:
        # Retrieve the current crontab file contents
        process = subprocess.Popen(['crontab', '-l'], stdout=subprocess.PIPE, text=True)
        current_crontab, _ = process.communicate()

        # Append the new cron job
        updated_crontab = current_crontab.strip() + '\n#' + comment + '\n' + new_cron_job

        # Use the crontab '-' command to update the crontab with the new content
        process = subprocess.Popen(['crontab', '-'], stdin=subprocess.PIPE, text=True)
        process.communicate(input=updated_crontab)

        print("Cron job successfully appended.")
    except Exception as e:
        print("Error:", e)
