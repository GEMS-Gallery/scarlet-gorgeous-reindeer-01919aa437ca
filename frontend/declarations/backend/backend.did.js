export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'getScreenshotUrl' : IDL.Func([], [IDL.Text], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
