function DemoPlayer() {
    var _self = this;

    this.Min = 0;
    this.Max = 0;
    this.Cur = 0;
    this.IsPlaying = false;
    this._WorkerThread = null;

    this.BaseSpeed = 25;
    this.Modifier = 1.0;

    this.$TimeDisplayCur = null;
    this.$TimeDisplayMax = null;

    this.Initialize = function(min, max) {
        _self.Min = min;
        _self.Max = max;
        _self.Cur = min;

        _self.$TimeDisplayCur = $($('.time-display .cur')[0]);
        _self.$TimeDisplayMax = $($('.time-display .max')[0]);

        _self.UpdateProgress(min);

        _self.UpdateTime(true);
        _self.UpdateTime(false);

        $('#playback-progress').attr({
            min: _self.Min,
            max: _self.Max
        }).off('input').on('input', function() {
            _self.Cur = parseInt($(this).val());
            _self.UpdateTime();
        });        

        $('#btn-play, #btn-pause').off('click').click(function() {
            _self.IsPlaying = !_self.IsPlaying;
            _self.UpdateButtonState();         
        });

        $('#btn-fullscreen').off('click').click(function() {
            $($(this).find('.fas')[0]).toggleClass('fa-expand fa-compress');
            if ( document.fullscreenElement ) {
                _self.LeaveFullscreen();
            } else {
                _self.EnterFullscreen();
            }
        });

        $('#btn-settings').off('click').click(function() {
            $(this).find('.options').fadeToggle(250);
        });

        $('.speed-modifier').off('click').click(function() {
            _self.Modifier = $(this).data('modifier');
        });

        clearInterval(_self._WorkerThread);
        _self._WorkerThread = setInterval(_self.Worker, 25);
    };

    this.Pause = function() {
        _self.IsPlaying = false;
        _self.UpdateButtonState();    
    };

    this.UpdateButtonState = function() {
        if ( _self.IsPlaying ) {
            $('#btn-play').hide();
            $('#btn-pause').show();
        } else {
            $('#btn-play').show();
            $('#btn-pause').hide();            
        }
    };

    this.UpdateProgress = function(cur) {
        _self.Cur = cur;
        $('#playback-progress').val(_self.Cur);
    };

    this.Worker = function() {
        if ( !_self.IsPlaying )
            return;

        _self.Cur += _self.GetActualSpeed();
        _self.UpdateProgress(_self.Cur);
        _self.UpdateTime();

        if ( _self.Cur >= _self.Max ) {
            _self.IsPlaying = false;
            _self.Cur = _self.Min;
            _self.UpdateButtonState();
        }
    }

    this.GetProgress = function() {
        return _self.Cur;
    }

    this.GetActualSpeed = function() {
        return _self.BaseSpeed * _self.Modifier;
    }

    this.UpdateTime = function(shouldUpdateMax) {

        var maxTime = (_self.Cur - _self.Min) / 1000;
        if (shouldUpdateMax ) {
            maxTime = (_self.Max - _self.Min) / 1000;
        }

        var min = parseInt(maxTime / 60);
        var sec = parseInt(maxTime % 60);

        var element = shouldUpdateMax ? 
            _self.$TimeDisplayMax : _self.$TimeDisplayCur;

        element.html((min < 10 ? ('0' + min) : min) 
            + ':' + (sec < 10 ? ('0' + sec) : sec));
    }

    this.GetRelativeLeftOffsetForTimestamp = function(t) {
        return 100 / (_self.Max - _self.Min) * (t - _self.Min);
    };

    this.EnterFullscreen = function() {
        var elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
          } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
          } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            elem.webkitRequestFullscreen();
          } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
          }
    };

    this.LeaveFullscreen = function() {        
        if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
          } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
            document.webkitExitFullscreen();
          } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
          }
    };
}