from flask import Flask, render_template, jsonify, send_file, request
import os

app = Flask(__name__)
app.static_folder = 'static'

####################################################################
# Load the index.html file at root
####################################################################
@app.route('/')
def index():
    return render_template('index.html')

####################################################################
# Get a list of all files in the 'configs' directory
####################################################################
@app.route('/api/get_files')
def get_files():
    folder_path = 'configs'  
    current_dir = os.path.dirname(os.path.realpath(__file__))
    full_path = os.path.join(current_dir, folder_path)
    files = [f for f in os.listdir(full_path) if os.path.isfile(os.path.join(full_path, f))]
    return jsonify(files)

####################################################################
# Get the contents of a file
####################################################################
@app.route('/api/get_file_content')
def get_file_content():
    folder_path = 'configs'  
    filename = request.args.get('filename')
    full_path = os.path.join(folder_path, filename)
    
    try:
        with open(full_path, 'r') as file:
            content = file.read()
        return content
    except FileNotFoundError:
        return f"File '{filename}' not found."
    
####################################################################
# Save Changes to the file    
####################################################################
@app.route('/api/save_file_content', methods=['POST'])
def save_file_content():
    data = request.get_json()
    filename = data.get('filename')
    content = data.get('content')

    folder_path = 'configs'
    file_path = os.path.join(folder_path, filename)

    try:
        with open(file_path, 'w') as file:
            file.write(content)
        return jsonify(success=True)
    except Exception as e:
        return jsonify(success=False, error=str(e))

# Main -> DEBUG
if __name__ == '__main__':
    app.run(debug=True) 