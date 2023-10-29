function maxValue = acquireData_channel_1()
    global maxValueGlobal bufferedAiCtrl; 
    maxValueGlobal = 1;  % Reset the value here

    try
        bufferedAiCtrl.Start();
        pause(0.028);
        bufferedAiCtrl.Stop();
    catch e
        % Handle errors.
        disp(e.message);
    end
    
    % Return the global max value.
    maxValue = maxValueGlobal;
end
