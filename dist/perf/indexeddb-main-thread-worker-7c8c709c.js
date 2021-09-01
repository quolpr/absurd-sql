function decodeBase64(base64, enableUnicode) {
    var binaryString = atob(base64);
    if (enableUnicode) {
        var binaryView = new Uint8Array(binaryString.length);
        for (var i = 0, n = binaryString.length; i < n; ++i) {
            binaryView[i] = binaryString.charCodeAt(i);
        }
        return String.fromCharCode.apply(null, new Uint16Array(binaryView.buffer));
    }
    return binaryString;
}

function createURL(base64, sourcemapArg, enableUnicodeArg) {
    var sourcemap = sourcemapArg === undefined ? null : sourcemapArg;
    var enableUnicode = enableUnicodeArg === undefined ? false : enableUnicodeArg;
    var source = decodeBase64(base64, enableUnicode);
    var start = source.indexOf('\n', 10) + 1;
    var body = source.substring(start) + (sourcemap ? '\/\/# sourceMappingURL=' + sourcemap : '');
    var blob = new Blob([body], { type: 'application/javascript' });
    return URL.createObjectURL(blob);
}

function createBase64WorkerFactory(base64, sourcemapArg, enableUnicodeArg) {
    var url;
    return function WorkerFactory(options) {
        url = url || createURL(base64, sourcemapArg, enableUnicodeArg);
        return new Worker(url, options);
    };
}

var WorkerFactory = createBase64WorkerFactory('Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwohZnVuY3Rpb24oKXsidXNlIHN0cmljdCI7bGV0IHQ9MzczNTkyODU1OTtjbGFzcyBle2NvbnN0cnVjdG9yKHQse2luaXRpYWxPZmZzZXQ6ZT00LHVzZUF0b21pY3M6aT0hMCxzdHJlYW06cz0hMCxkZWJ1ZzpyLG5hbWU6bn09e30pe3RoaXMuYnVmZmVyPXQsdGhpcy5hdG9taWNWaWV3PW5ldyBJbnQzMkFycmF5KHQpLHRoaXMub2Zmc2V0PWUsdGhpcy51c2VBdG9taWNzPWksdGhpcy5zdHJlYW09cyx0aGlzLmRlYnVnPXIsdGhpcy5uYW1lPW59bG9nKC4uLnQpe3RoaXMuZGVidWcmJmNvbnNvbGUubG9nKGBbcmVhZGVyOiAke3RoaXMubmFtZX1dYCwuLi50KX13YWl0V3JpdGUodCxlPW51bGwpe2lmKHRoaXMudXNlQXRvbWljcyl7Zm9yKHRoaXMubG9nKGB3YWl0aW5nIGZvciAke3R9YCk7MD09PUF0b21pY3MubG9hZCh0aGlzLmF0b21pY1ZpZXcsMCk7KXtpZihudWxsIT1lJiYidGltZWQtb3V0Ij09PUF0b21pY3Mud2FpdCh0aGlzLmF0b21pY1ZpZXcsMCwwLGUpKXRocm93IG5ldyBFcnJvcigidGltZW91dCIpO0F0b21pY3Mud2FpdCh0aGlzLmF0b21pY1ZpZXcsMCwwLDUwMCl9dGhpcy5sb2coYHJlc3VtZWQgZm9yICR7dH1gKX1lbHNlIGlmKDEhPT10aGlzLmF0b21pY1ZpZXdbMF0pdGhyb3cgbmV3IEVycm9yKCJgd2FpdFdyaXRlYCBleHBlY3RlZCBhcnJheSB0byBiZSByZWFkYWJsZSIpfWZsaXAoKXtpZih0aGlzLmxvZygiZmxpcCIpLHRoaXMudXNlQXRvbWljcyl7aWYoMSE9PUF0b21pY3MuY29tcGFyZUV4Y2hhbmdlKHRoaXMuYXRvbWljVmlldywwLDEsMCkpdGhyb3cgbmV3IEVycm9yKCJSZWFkIGRhdGEgb3V0IG9mIHN5bmMhIFRoaXMgaXMgZGlzYXN0cm91cyIpO0F0b21pY3Mubm90aWZ5KHRoaXMuYXRvbWljVmlldywwKX1lbHNlIHRoaXMuYXRvbWljVmlld1swXT0wO3RoaXMub2Zmc2V0PTR9ZG9uZSgpe3RoaXMud2FpdFdyaXRlKCJkb25lIik7bGV0IGU9bmV3IERhdGFWaWV3KHRoaXMuYnVmZmVyLHRoaXMub2Zmc2V0KS5nZXRVaW50MzIoMCk9PT10O3JldHVybiBlJiYodGhpcy5sb2coImRvbmUiKSx0aGlzLmZsaXAoKSksZX1wZWVrKHQpe3RoaXMucGVla09mZnNldD10aGlzLm9mZnNldDtsZXQgZT10KCk7cmV0dXJuIHRoaXMub2Zmc2V0PXRoaXMucGVla09mZnNldCx0aGlzLnBlZWtPZmZzZXQ9bnVsbCxlfXN0cmluZyh0KXt0aGlzLndhaXRXcml0ZSgic3RyaW5nIix0KTtsZXQgZT10aGlzLl9pbnQzMigpLGk9ZS8yLHM9bmV3IERhdGFWaWV3KHRoaXMuYnVmZmVyLHRoaXMub2Zmc2V0LGUpLHI9W107Zm9yKGxldCB0PTA7dDxpO3QrKylyLnB1c2gocy5nZXRVaW50MTYoMip0KSk7bGV0IG49U3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLHIpO3JldHVybiB0aGlzLmxvZygic3RyaW5nIixuKSx0aGlzLm9mZnNldCs9ZSxudWxsPT10aGlzLnBlZWtPZmZzZXQmJnRoaXMuZmxpcCgpLG59X2ludDMyKCl7bGV0IHQ9bmV3IERhdGFWaWV3KHRoaXMuYnVmZmVyLHRoaXMub2Zmc2V0KS5nZXRJbnQzMigpO3JldHVybiB0aGlzLmxvZygiX2ludDMyIix0KSx0aGlzLm9mZnNldCs9NCx0fWludDMyKCl7dGhpcy53YWl0V3JpdGUoImludDMyIik7bGV0IHQ9dGhpcy5faW50MzIoKTtyZXR1cm4gdGhpcy5sb2coImludDMyIix0KSxudWxsPT10aGlzLnBlZWtPZmZzZXQmJnRoaXMuZmxpcCgpLHR9Ynl0ZXMoKXt0aGlzLndhaXRXcml0ZSgiYnl0ZXMiKTtsZXQgdD10aGlzLl9pbnQzMigpLGU9bmV3IEFycmF5QnVmZmVyKHQpO3JldHVybiBuZXcgVWludDhBcnJheShlKS5zZXQobmV3IFVpbnQ4QXJyYXkodGhpcy5idWZmZXIsdGhpcy5vZmZzZXQsdCkpLHRoaXMubG9nKCJieXRlcyIsZSksdGhpcy5vZmZzZXQrPXQsbnVsbD09dGhpcy5wZWVrT2Zmc2V0JiZ0aGlzLmZsaXAoKSxlfX1jbGFzcyBpe2NvbnN0cnVjdG9yKHQse2luaXRpYWxPZmZzZXQ6ZT00LHVzZUF0b21pY3M6aT0hMCxzdHJlYW06cz0hMCxkZWJ1ZzpyLG5hbWU6bn09e30pe3RoaXMuYnVmZmVyPXQsdGhpcy5hdG9taWNWaWV3PW5ldyBJbnQzMkFycmF5KHQpLHRoaXMub2Zmc2V0PWUsdGhpcy51c2VBdG9taWNzPWksdGhpcy5zdHJlYW09cyx0aGlzLmRlYnVnPXIsdGhpcy5uYW1lPW4sdGhpcy51c2VBdG9taWNzP0F0b21pY3Muc3RvcmUodGhpcy5hdG9taWNWaWV3LDAsMCk6dGhpcy5hdG9taWNWaWV3WzBdPTB9bG9nKC4uLnQpe3RoaXMuZGVidWcmJmNvbnNvbGUubG9nKGBbd3JpdGVyOiAke3RoaXMubmFtZX1dYCwuLi50KX13YWl0UmVhZCh0KXtpZih0aGlzLnVzZUF0b21pY3Mpe2lmKHRoaXMubG9nKGB3YWl0aW5nIGZvciAke3R9YCksMCE9PUF0b21pY3MuY29tcGFyZUV4Y2hhbmdlKHRoaXMuYXRvbWljVmlldywwLDAsMSkpdGhyb3cgbmV3IEVycm9yKCJXcm90ZSBzb21ldGhpbmcgaW50byB1bndyaXRhYmxlIGJ1ZmZlciEgVGhpcyBpcyBkaXNhc3Ryb3VzIik7Zm9yKEF0b21pY3Mubm90aWZ5KHRoaXMuYXRvbWljVmlldywwKTsxPT09QXRvbWljcy5sb2FkKHRoaXMuYXRvbWljVmlldywwKTspQXRvbWljcy53YWl0KHRoaXMuYXRvbWljVmlldywwLDEsNTAwKTt0aGlzLmxvZyhgcmVzdW1lZCBmb3IgJHt0fWApfWVsc2UgdGhpcy5hdG9taWNWaWV3WzBdPTE7dGhpcy5vZmZzZXQ9NH1maW5hbGl6ZSgpe3RoaXMubG9nKCJmaW5hbGl6aW5nIiksbmV3IERhdGFWaWV3KHRoaXMuYnVmZmVyLHRoaXMub2Zmc2V0KS5zZXRVaW50MzIoMCx0KSx0aGlzLndhaXRSZWFkKCJmaW5hbGl6ZSIpfXN0cmluZyh0KXt0aGlzLmxvZygic3RyaW5nIix0KTtsZXQgZT0yKnQubGVuZ3RoO3RoaXMuX2ludDMyKGUpO2xldCBpPW5ldyBEYXRhVmlldyh0aGlzLmJ1ZmZlcix0aGlzLm9mZnNldCxlKTtmb3IobGV0IGU9MDtlPHQubGVuZ3RoO2UrKylpLnNldFVpbnQxNigyKmUsdC5jaGFyQ29kZUF0KGUpKTt0aGlzLm9mZnNldCs9ZSx0aGlzLndhaXRSZWFkKCJzdHJpbmciKX1faW50MzIodCl7bmV3IERhdGFWaWV3KHRoaXMuYnVmZmVyLHRoaXMub2Zmc2V0KS5zZXRJbnQzMigwLHQpLHRoaXMub2Zmc2V0Kz00fWludDMyKHQpe3RoaXMubG9nKCJpbnQzMiIsdCksdGhpcy5faW50MzIodCksdGhpcy53YWl0UmVhZCgiaW50MzIiKX1ieXRlcyh0KXt0aGlzLmxvZygiYnl0ZXMiLHQpO2xldCBlPXQuYnl0ZUxlbmd0aDt0aGlzLl9pbnQzMihlKSxuZXcgVWludDhBcnJheSh0aGlzLmJ1ZmZlcix0aGlzLm9mZnNldCkuc2V0KG5ldyBVaW50OEFycmF5KHQpKSx0aGlzLm9mZnNldCs9ZSx0aGlzLndhaXRSZWFkKCJieXRlcyIpfX1sZXQgcyxyPXt9LG49e307YXN5bmMgZnVuY3Rpb24gYSh0LGUsaSl7Z2xvYmFsVGhpcy5wb3N0TWVzc2FnZSh7dHlwZToiX19wZXJmLWRlZXRzOmxvZy1wZXJmIixkYXRhVHlwZTp0LG5hbWU6ZSxkYXRhOmksYXBpVmVyc2lvbjoxfSl9ZnVuY3Rpb24gbygpe2dsb2JhbFRoaXMucG9zdE1lc3NhZ2Uoe3R5cGU6Il9fcGVyZi1kZWV0czpjbGVhci1wZXJmIn0pLHI9e30sbj17fSxzPXBlcmZvcm1hbmNlLm5vdygpfWFzeW5jIGZ1bmN0aW9uIGwoKXtPYmplY3Qua2V5cyhyKS5tYXAoKHQ9PnthKCJ0aW1pbmciLHQsclt0XS5kYXRhLm1hcCgodD0+KHt4OnQuc3RhcnQrdC50b29rLHk6dC50b29rfSkpKSl9KSksT2JqZWN0LmtleXMobikubWFwKCh0PT57YSgiY291bnQiLHQsblt0XS5tYXAoKCh0LGUpPT4oe3g6dC50aW1lLHk6ZX0pKSkpfSkpfWZ1bmN0aW9uIGModCl7bnVsbD09clt0XSYmKHJbdF09e3N0YXJ0Om51bGwsZGF0YTpbXX0pO2xldCBlPXJbdF07aWYobnVsbCE9ZS5zdGFydCl0aHJvdyBuZXcgRXJyb3IoYHRpbWVyIGFscmVhZHkgc3RhcnRlZCAke3R9YCk7ZS5zdGFydD1wZXJmb3JtYW5jZS5ub3coKX1mdW5jdGlvbiBoKHQpe2xldCBlPXBlcmZvcm1hbmNlLm5vdygpLGk9clt0XTtpZihpJiZudWxsIT1pLnN0YXJ0KXtsZXQgdD1lLWkuc3RhcnQscj1pLnN0YXJ0LXM7aS5zdGFydD1udWxsLGkuZGF0YS5sZW5ndGg8NGU0JiZpLmRhdGEucHVzaCh7c3RhcnQ6cix0b29rOnR9KX19ZnVuY3Rpb24gZih0KXtudWxsPT1uW3RdJiYoblt0XT1bXSksblt0XS5wdXNoKHt0aW1lOnBlcmZvcm1hbmNlLm5vdygpfSl9aWYoY29uc29sZS53YXJuKCJwZXJmLWRlZXRzIGxvYWRlZC4gSWYgdGhpcyBpcyB0aGUgcHJvZHVjdGlvbiBidW5kbGUsIHlvdSBzaG91bGQgcmVtb3ZlIGl0IiksbnVsbD09Z2xvYmFsVGhpcy5hZGRFdmVudExpc3RlbmVyKXRocm93IG5ldyBFcnJvcigicGVyZi1kZWV0cyBjdXJyZW50bHkgb25seSBzdXBwb3J0cyBicm93c2VyIGFuZCB3ZWIgd29ya2VyIGVudmlyb25tZW50cy4gT3RoZXIgZW52aXJvbm1lbnRzIHNob3VsZCBhbGlhcyB0aGUgcGFja2FnZSB0byBgcGVyZi1kZWV0cy9ub29wYC4iKTtnbG9iYWxUaGlzLmFkZEV2ZW50TGlzdGVuZXIoIm1lc3NhZ2UiLCh0PT57c3dpdGNoKHQuZGF0YS50eXBlKXtjYXNlIl9fcGVyZi1kZWV0czpzdGFydC1wcm9maWxlIjpvKCk7YnJlYWs7Y2FzZSJfX3BlcmYtZGVldHM6c3RvcC1wcm9maWxlIjpsKCk7YnJlYWs7Y2FzZSJfX3BlcmYtZGVldHM6Y2xlYXItcGVyZiI6Y2FzZSJfX3BlcmYtZGVldHM6bG9nLXBlcmYiOiJ1bmRlZmluZWQiPT10eXBlb2Ygd2luZG93JiZzZWxmLnBvc3RNZXNzYWdlKHQuZGF0YSl9fSkpO2xldCB1PTAsZD0xLHc9MixnPTQ7bGV0IG09L14oKD8hY2hyb21lfGFuZHJvaWQpLikqc2FmYXJpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSxwPW5ldyBNYXAseT1uZXcgTWFwO2Z1bmN0aW9uIGIodCxlKXtpZighdCl0aHJvdyBuZXcgRXJyb3IoZSl9Y2xhc3Mga3tjb25zdHJ1Y3Rvcih0LGU9InJlYWRvbmx5Iil7dGhpcy5kYj10LGYoInRyYW5zYWN0aW9ucyIpLHRoaXMudHJhbnM9dGhpcy5kYi50cmFuc2FjdGlvbihbImRhdGEiXSxlKSx0aGlzLnN0b3JlPXRoaXMudHJhbnMub2JqZWN0U3RvcmUoImRhdGEiKSx0aGlzLmxvY2tUeXBlPSJyZWFkb25seSI9PT1lP2Q6Zyx0aGlzLmNhY2hlZEZpcnN0QmxvY2s9bnVsbCx0aGlzLmN1cnNvcj1udWxsLHRoaXMucHJldlJlYWRzPW51bGx9YXN5bmMgcHJlZmV0Y2hGaXJzdEJsb2NrKHQpe2xldCBlPWF3YWl0IHRoaXMuZ2V0KDApO3JldHVybiB0aGlzLmNhY2hlZEZpcnN0QmxvY2s9ZSxlfWFzeW5jIHdhaXRDb21wbGV0ZSgpe3JldHVybiBuZXcgUHJvbWlzZSgoKHQsZSk9Pnt0aGlzLmNvbW1pdCgpLHRoaXMubG9ja1R5cGU9PT1nPyh0aGlzLnRyYW5zLm9uY29tcGxldGU9ZT0+dCgpLHRoaXMudHJhbnMub25lcnJvcj10PT5lKHQpKTptP3RoaXMudHJhbnMub25jb21wbGV0ZT1lPT50KCk6dCgpfSkpfWNvbW1pdCgpe3RoaXMudHJhbnMuY29tbWl0JiZ0aGlzLnRyYW5zLmNvbW1pdCgpfWFzeW5jIHVwZ3JhZGVFeGNsdXNpdmUoKXt0aGlzLmNvbW1pdCgpLGYoInRyYW5zYWN0aW9ucyIpLHRoaXMudHJhbnM9dGhpcy5kYi50cmFuc2FjdGlvbihbImRhdGEiXSwicmVhZHdyaXRlIiksdGhpcy5zdG9yZT10aGlzLnRyYW5zLm9iamVjdFN0b3JlKCJkYXRhIiksdGhpcy5sb2NrVHlwZT1nO2xldCB0PXRoaXMuY2FjaGVkRmlyc3RCbG9jaztyZXR1cm4gZnVuY3Rpb24odCxlKXtpZihudWxsIT10JiZudWxsIT1lKXtsZXQgaT1uZXcgVWludDhBcnJheSh0KSxzPW5ldyBVaW50OEFycmF5KGUpO2ZvcihsZXQgdD0yNDt0PDQwO3QrKylpZihpW3RdIT09c1t0XSlyZXR1cm4hMTtyZXR1cm4hMH1yZXR1cm4gbnVsbD09dCYmbnVsbD09ZX0oYXdhaXQgdGhpcy5wcmVmZXRjaEZpcnN0QmxvY2soNTAwKSx0KX1kb3duZ3JhZGVTaGFyZWQoKXt0aGlzLmNvbW1pdCgpLGYoInRyYW5zYWN0aW9ucyIpLHRoaXMudHJhbnM9dGhpcy5kYi50cmFuc2FjdGlvbihbImRhdGEiXSwicmVhZG9ubHkiKSx0aGlzLnN0b3JlPXRoaXMudHJhbnMub2JqZWN0U3RvcmUoImRhdGEiKSx0aGlzLmxvY2tUeXBlPWR9YXN5bmMgZ2V0KHQpe3JldHVybiBuZXcgUHJvbWlzZSgoKGUsaSk9PntjKCJnZXQiKTtsZXQgcz10aGlzLnN0b3JlLmdldCh0KTtzLm9uc3VjY2Vzcz10PT57aCgiZ2V0IiksZShzLnJlc3VsdCl9LHMub25lcnJvcj10PT5pKHQpfSkpfWdldFJlYWREaXJlY3Rpb24oKXtsZXQgdD10aGlzLnByZXZSZWFkcztpZih0KXtpZih0WzBdPHRbMV0mJnRbMV08dFsyXSYmdFsyXS10WzBdPDEwKXJldHVybiJuZXh0IjtpZih0WzBdPnRbMV0mJnRbMV0+dFsyXSYmdFswXS10WzJdPDEwKXJldHVybiJwcmV2In1yZXR1cm4gbnVsbH1yZWFkKHQpe2xldCBlPSgpPT5uZXcgUHJvbWlzZSgoKHQsZSk9PntpZihudWxsIT10aGlzLmN1cnNvclByb21pc2UpdGhyb3cgbmV3IEVycm9yKCJ3YWl0Q3Vyc29yKCkgY2FsbGVkIGJ1dCBzb21ldGhpbmcgZWxzZSBpcyBhbHJlYWR5IHdhaXRpbmciKTt0aGlzLmN1cnNvclByb21pc2U9e3Jlc29sdmU6dCxyZWplY3Q6ZX19KSk7aWYodGhpcy5jdXJzb3Ipe2xldCBpPXRoaXMuY3Vyc29yO3JldHVybiJuZXh0Ij09PWkuZGlyZWN0aW9uJiZ0Pmkua2V5JiZ0PGkua2V5KzEwMD8oYygic3RyZWFtLW5leHQiKSxpLmFkdmFuY2UodC1pLmtleSksZSgpKToicHJldiI9PT1pLmRpcmVjdGlvbiYmdDxpLmtleSYmdD5pLmtleS0xMDA/KGMoInN0cmVhbS1uZXh0IiksaS5hZHZhbmNlKGkua2V5LXQpLGUoKSk6KHRoaXMuY3Vyc29yPW51bGwsdGhpcy5yZWFkKHQpKX17bGV0IGk9dGhpcy5nZXRSZWFkRGlyZWN0aW9uKCk7aWYoaSl7bGV0IHM7dGhpcy5wcmV2UmVhZHM9bnVsbCxzPSJwcmV2Ij09PWk/SURCS2V5UmFuZ2UudXBwZXJCb3VuZCh0KTpJREJLZXlSYW5nZS5sb3dlckJvdW5kKHQpO2xldCByPXRoaXMuc3RvcmUub3BlbkN1cnNvcihzLGkpO3JldHVybiBjKCJzdHJlYW0iKSxyLm9uc3VjY2Vzcz10PT57aCgic3RyZWFtIiksaCgic3RyZWFtLW5leHQiKTtsZXQgZT10LnRhcmdldC5yZXN1bHQ7aWYodGhpcy5jdXJzb3I9ZSxudWxsPT10aGlzLmN1cnNvclByb21pc2UpdGhyb3cgbmV3IEVycm9yKCJHb3QgZGF0YSBmcm9tIGN1cnNvciBidXQgbm90aGluZyBpcyB3YWl0aW5nIGl0Iik7dGhpcy5jdXJzb3JQcm9taXNlLnJlc29sdmUoZT9lLnZhbHVlOm51bGwpLHRoaXMuY3Vyc29yUHJvbWlzZT1udWxsfSxyLm9uZXJyb3I9dD0+e2lmKGNvbnNvbGUubG9nKCJDdXJzb3IgZmFpbHVyZToiLHQpLG51bGw9PXRoaXMuY3Vyc29yUHJvbWlzZSl0aHJvdyBuZXcgRXJyb3IoIkdvdCBkYXRhIGZyb20gY3Vyc29yIGJ1dCBub3RoaW5nIGlzIHdhaXRpbmcgaXQiKTt0aGlzLmN1cnNvclByb21pc2UucmVqZWN0KHQpLHRoaXMuY3Vyc29yUHJvbWlzZT1udWxsfSxlKCl9cmV0dXJuIG51bGw9PXRoaXMucHJldlJlYWRzJiYodGhpcy5wcmV2UmVhZHM9WzAsMCwwXSksdGhpcy5wcmV2UmVhZHMucHVzaCh0KSx0aGlzLnByZXZSZWFkcy5zaGlmdCgpLHRoaXMuZ2V0KHQpfX1hc3luYyBzZXQodCl7cmV0dXJuIHRoaXMucHJldlJlYWRzPW51bGwsbmV3IFByb21pc2UoKChlLGkpPT57bGV0IHM9dGhpcy5zdG9yZS5wdXQodC52YWx1ZSx0LmtleSk7cy5vbnN1Y2Nlc3M9dD0+ZShzLnJlc3VsdCkscy5vbmVycm9yPXQ9PmkodCl9KSl9YXN5bmMgYnVsa1NldCh0KXt0aGlzLnByZXZSZWFkcz1udWxsO2ZvcihsZXQgZSBvZiB0KXRoaXMuc3RvcmUucHV0KGUudmFsdWUsZS5rZXkpfX1hc3luYyBmdW5jdGlvbiB2KHQpe3JldHVybiBuZXcgUHJvbWlzZSgoKGUsaSk9PntpZihwLmdldCh0KSlyZXR1cm4gdm9pZCBlKHAuZ2V0KHQpKTtsZXQgcz1nbG9iYWxUaGlzLmluZGV4ZWREQi5vcGVuKHQsMik7cy5vbnN1Y2Nlc3M9aT0+e2xldCBzPWkudGFyZ2V0LnJlc3VsdDtzLm9udmVyc2lvbmNoYW5nZT0oKT0+e2NvbnNvbGUubG9nKCJjbG9zaW5nIGJlY2F1c2UgdmVyc2lvbiBjaGFuZ2VkIikscy5jbG9zZSgpLHAuZGVsZXRlKHQpfSxzLm9uY2xvc2U9KCk9PntwLmRlbGV0ZSh0KX0scC5zZXQodCxzKSxlKHMpfSxzLm9udXBncmFkZW5lZWRlZD10PT57bGV0IGU9dC50YXJnZXQucmVzdWx0O2Uub2JqZWN0U3RvcmVOYW1lcy5jb250YWlucygiZGF0YSIpfHxlLmNyZWF0ZU9iamVjdFN0b3JlKCJkYXRhIil9LHMub25ibG9ja2VkPXQ9PmNvbnNvbGUubG9nKCJibG9ja2VkIix0KSxzLm9uZXJyb3I9cy5vbmFib3J0PXQ9PmkodC50YXJnZXQuZXJyb3IpfSkpfWFzeW5jIGZ1bmN0aW9uIEEodCxlLGkpe2xldCBzPXkuZ2V0KHQpO2lmKHMpe2lmKCJyZWFkd3JpdGUiPT09ZSYmcy5sb2NrVHlwZT09PWQpdGhyb3cgbmV3IEVycm9yKCJBdHRlbXB0ZWQgd3JpdGUgYnV0IG9ubHkgaGFzIFNIQVJFRCBsb2NrIik7cmV0dXJuIGkocyl9cz1uZXcgayhhd2FpdCB2KHQpLGUpLGF3YWl0IGkocyksYXdhaXQgcy53YWl0Q29tcGxldGUoKX1hc3luYyBmdW5jdGlvbiBSKHQsZSxpKXtsZXQgcz1mdW5jdGlvbih0KXtyZXR1cm4geS5nZXQodCl9KGUpO2lmKGk9PT1kKXtpZihudWxsPT1zKXRocm93IG5ldyBFcnJvcigiVW5sb2NrIGVycm9yIChTSEFSRUQpOiBubyB0cmFuc2FjdGlvbiBydW5uaW5nIik7cy5sb2NrVHlwZT09PWcmJnMuZG93bmdyYWRlU2hhcmVkKCl9ZWxzZSBpPT09dSYmcyYmKGF3YWl0IHMud2FpdENvbXBsZXRlKCkseS5kZWxldGUoZSkpO3QuaW50MzIoMCksdC5maW5hbGl6ZSgpfWFzeW5jIGZ1bmN0aW9uIFYodCxlKXtsZXQgaT10LnN0cmluZygpO3N3aXRjaChpKXtjYXNlInByb2ZpbGUtc3RhcnQiOnQuZG9uZSgpLG8oKSxlLmludDMyKDApLGUuZmluYWxpemUoKSxWKHQsZSk7YnJlYWs7Y2FzZSJwcm9maWxlLXN0b3AiOnQuZG9uZSgpLGwoKSxhd2FpdCBuZXcgUHJvbWlzZSgodD0+c2V0VGltZW91dCh0LDFlMykpKSxlLmludDMyKDApLGUuZmluYWxpemUoKSxWKHQsZSk7YnJlYWs7Y2FzZSJ3cml0ZUJsb2NrcyI6e2xldCBpPXQuc3RyaW5nKCkscz1bXTtmb3IoOyF0LmRvbmUoKTspe2xldCBlPXQuaW50MzIoKSxpPXQuYnl0ZXMoKTtzLnB1c2goe3BvczplLGRhdGE6aX0pfWF3YWl0IGFzeW5jIGZ1bmN0aW9uKHQsZSxpKXtyZXR1cm4gQShlLCJyZWFkd3JpdGUiLChhc3luYyBlPT57YXdhaXQgZS5idWxrU2V0KGkubWFwKCh0PT4oe2tleTp0LnBvcyx2YWx1ZTp0LmRhdGF9KSkpKSx0LmludDMyKDApLHQuZmluYWxpemUoKX0pKX0oZSxpLHMpLFYodCxlKTticmVha31jYXNlInJlYWRCbG9jayI6e2xldCBpPXQuc3RyaW5nKCkscz10LmludDMyKCk7dC5kb25lKCksYXdhaXQgYXN5bmMgZnVuY3Rpb24odCxlLGkpe3JldHVybiBBKGUsInJlYWRvbmx5IiwoYXN5bmMgZT0+e2xldCBzPWF3YWl0IGUucmVhZChpKTtudWxsPT1zP3QuYnl0ZXMobmV3IEFycmF5QnVmZmVyKDApKTp0LmJ5dGVzKHMpLHQuZmluYWxpemUoKX0pKX0oZSxpLHMpLFYodCxlKTticmVha31jYXNlInJlYWRNZXRhIjp7bGV0IGk9dC5zdHJpbmcoKTt0LmRvbmUoKSxhd2FpdCBhc3luYyBmdW5jdGlvbih0LGUpe3JldHVybiBBKGUsInJlYWRvbmx5IiwoYXN5bmMgaT0+e3RyeXtjb25zb2xlLmxvZygiUmVhZGluZyBtZXRhLi4uIik7bGV0IHM9YXdhaXQgaS5nZXQoLTEpO2lmKGNvbnNvbGUubG9nKGBHb3QgbWV0YSBmb3IgJHtlfTpgLHMpLG51bGw9PXMpdC5pbnQzMigtMSksdC5pbnQzMig0MDk2KSx0LmZpbmFsaXplKCk7ZWxzZXtsZXQgZT1hd2FpdCBpLmdldCgwKSxyPTQwOTY7ZSYmKHI9MjU2Km5ldyBVaW50MTZBcnJheShlKVs4XSksdC5pbnQzMihzLnNpemUpLHQuaW50MzIociksdC5maW5hbGl6ZSgpfX1jYXRjaChlKXtjb25zb2xlLmxvZyhlKSx0LmludDMyKC0xKSx0LmludDMyKC0xKSx0LmZpbmFsaXplKCl9fSkpfShlLGkpLFYodCxlKTticmVha31jYXNlIndyaXRlTWV0YSI6e2xldCBpPXQuc3RyaW5nKCkscz10LmludDMyKCk7dC5kb25lKCksYXdhaXQgYXN5bmMgZnVuY3Rpb24odCxlLGkpe3JldHVybiBBKGUsInJlYWR3cml0ZSIsKGFzeW5jIGU9Pnt0cnl7YXdhaXQgZS5zZXQoe2tleTotMSx2YWx1ZTppfSksdC5pbnQzMigwKSx0LmZpbmFsaXplKCl9Y2F0Y2goZSl7Y29uc29sZS5sb2coZSksdC5pbnQzMigtMSksdC5maW5hbGl6ZSgpfX0pKX0oZSxpLHtzaXplOnN9KSxWKHQsZSk7YnJlYWt9Y2FzZSJjbG9zZUZpbGUiOntsZXQgaT10LnN0cmluZygpO3QuZG9uZSgpLGUuaW50MzIoMCksZS5maW5hbGl6ZSgpLGZ1bmN0aW9uKHQpe2xldCBlPXAuZ2V0KHQpO2UmJihlLmNsb3NlKCkscC5kZWxldGUodCkpfShpKSxzZWxmLmNsb3NlKCk7YnJlYWt9Y2FzZSJsb2NrRmlsZSI6e2xldCBpPXQuc3RyaW5nKCkscz10LmludDMyKCk7dC5kb25lKCksYXdhaXQgYXN5bmMgZnVuY3Rpb24odCxlLGkpe2xldCBzPXkuZ2V0KGUpO2lmKHMpaWYoaT5zLmxvY2tUeXBlKXtiKHMubG9ja1R5cGU9PT1kLGBVcHJhZGluZyBsb2NrIHR5cGUgZnJvbSAke3MubG9ja1R5cGV9IGlzIGludmFsaWRgKSxiKGk9PT13fHxpPT09ZyxgVXBncmFkaW5nIGxvY2sgdHlwZSB0byAke2l9IGlzIGludmFsaWRgKTtsZXQgZT1hd2FpdCBzLnVwZ3JhZGVFeGNsdXNpdmUoKTt0LmludDMyKGU/MDotMSksdC5maW5hbGl6ZSgpfWVsc2UgYihzLmxvY2tUeXBlPT09aSxgRG93bmdyYWRpbmcgbG9jayB0byAke2l9IGlzIGludmFsaWRgKSx0LmludDMyKDApLHQuZmluYWxpemUoKTtlbHNle2IoaT09PWQsYE5ldyBsb2NrcyBtdXN0IHN0YXJ0IGFzIFNIQVJFRCBpbnN0ZWFkIG9mICR7aX1gKTtsZXQgcz1uZXcgayhhd2FpdCB2KGUpKTthd2FpdCBzLnByZWZldGNoRmlyc3RCbG9jayg1MDApLHkuc2V0KGUscyksdC5pbnQzMigwKSx0LmZpbmFsaXplKCl9fShlLGkscyksVih0LGUpO2JyZWFrfWNhc2UidW5sb2NrRmlsZSI6e2xldCBpPXQuc3RyaW5nKCkscz10LmludDMyKCk7dC5kb25lKCksYXdhaXQgUihlLGkscyksVih0LGUpO2JyZWFrfWRlZmF1bHQ6dGhyb3cgbmV3IEVycm9yKCJVbmtub3duIG1ldGhvZDogIitpKX19c2VsZi5vbm1lc3NhZ2U9dD0+e3N3aXRjaCh0LmRhdGEudHlwZSl7Y2FzZSJpbml0Ijp7bGV0W3Mscl09dC5kYXRhLmJ1ZmZlcnM7VihuZXcgZShzLHtuYW1lOiJhcmdzIixkZWJ1ZzohMX0pLG5ldyBpKHIse25hbWU6InJlc3VsdHMiLGRlYnVnOiExfSkpO2JyZWFrfX19fSgpOwoK', null, false);
/* eslint-enable */

export default WorkerFactory;
