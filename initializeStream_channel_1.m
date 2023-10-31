function initializeStream_channel_1()
    % Declare and initialize global variables
    global maxValueGlobal bufferedAiCtrl;
    maxValueGlobal = 1;

    % Make Automation.BDaq assembly visible to MATLAB.
    BDaq = NET.addAssembly('Automation.BDaq');

    % Configure parameters.
    deviceDescription = 'PCIE-1840L,BID#0'; 
    startChannel = int32(1);
    channelCount = int32(2);
    intervalCount = int32(1024); 
    sampleCount = int32(2048);   
    convertClkRate = int32(500000);

    errorCode = Automation.BDaq.ErrorCode.Success;
    
    % Step 1: Create a 'BufferedAiCtrl' for buffered AI function.
    bufferedAiCtrl = Automation.BDaq.BufferedAiCtrl();

    % Set the notification event Handler.
    addlistener(bufferedAiCtrl, 'DataReady', @bufferedAiCtrl_DataReady);
    
    bufferedAiCtrl.SelectedDevice = Automation.BDaq.DeviceInformation(deviceDescription);
    % Specify the running mode: streaming buffered.
    bufferedAiCtrl.Streaming = true;

    scanChannel = bufferedAiCtrl.ScanChannel;
    scanChannel.ChannelStart = startChannel;
    scanChannel.ChannelCount = channelCount;
    scanChannel.IntervalCount = intervalCount;
    scanChannel.Samples = sampleCount;
    convertClock = bufferedAiCtrl.ConvertClock;
    convertClock.Rate = convertClkRate;

    errorCode = bufferedAiCtrl.Prepare();
end

function bufferedAiCtrl_DataReady(sender, e)
    global maxValueGlobal;

    bufferedAiCtrl = sender;
    scanChannel = bufferedAiCtrl.ScanChannel;
    channelCount = scanChannel.ChannelCount;

    if e.Count > channelCount
        sectionBuffer = NET.createArray('System.Double', e.Count);
        bufferedAiCtrl.GetData(e.Count, sectionBuffer);
    
        for i=1:(e.Count / channelCount)
            for j=1:channelCount
                Y(i,j) = sectionBuffer((i - 1) * channelCount+j);
            end
        end

        maxValue = Y; %max(max(Y));
        maxValueGlobal = maxValue;
        disp(maxValue);
    end
end
