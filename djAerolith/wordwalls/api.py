import json
from django.http import HttpResponse, HttpResponseForbidden


def configure(request):
    prefs = json.loads(request.raw_post_data)
    if request.method == "POST":
        saveObj = {'tc': {}, 'bc': {}}
        saveObj['tc'] = {'on': prefs['tilesOn'],
                         'font': prefs['font'],
                         'selection': prefs['tileSelection'],
                         'bold': prefs['bold']}
        saveObj['bc'] = {'showTable': prefs['showTable'],
                         'showCanvas': prefs['showCanvas'],
                         'showBorders': prefs['showBorders']}

        profile = request.user.get_profile()
        profile.customWordwallsStyle = json.dumps(saveObj)
        profile.save()
        return HttpResponse()

    return HttpResponseForbidden("Cannot save preferences.")